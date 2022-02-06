import { EntitiesPage, Entity, Film, PartOfFilm, Person, Planet, Starship } from "../models/entities";
import { Cache } from "./helpers/Cache";
import { SwapiService } from "./SwapiService";

const PLANETS_MAX = 100;
const FILMS_MAX = 100;
const ENTITY_MAX = 20;

interface EntitiesWithInfo<T extends Entity> {
  entities: T[];
  count: number;
}

export interface ShortEntity {
  id: string;
  name: string;
  films: string[];
}

export interface ShortPage {
  page: number;
  next: boolean;
  previous: boolean;
  result: ShortEntity[];
}

const INITIALIZATION_ERROR = new Error("Initialization error");
export class DataProvider {
  protected films: Cache<Film> = new Cache(FILMS_MAX);
  protected filmsCount?: number;
  protected planets: Cache<Planet> = new Cache(PLANETS_MAX);
  protected planetsCount?: number;
  protected people: Cache<Person> = new Cache(ENTITY_MAX);
  protected peopleCount?: number;
  protected starships: Cache<Starship> = new Cache(ENTITY_MAX);
  protected starshipsCount?: number;

  private swapiService: SwapiService;

  constructor(swapiService: SwapiService) {
    this.swapiService = swapiService;
  }

  getPagesTillMax = async <T extends Entity>(
    max: number,
    func: (page?: number) => Promise<EntitiesPage<T>>
  ): Promise<EntitiesWithInfo<T>> => {
    interface PagesAggr {
      previous: EntitiesPage<T>;
      entities: T[];
      count: number;
    }

    const recursiveFunction = async (aggr: PagesAggr): Promise<EntitiesWithInfo<T>> => {
      if (!aggr.previous.next || aggr.entities.length >= max)
        return { entities: aggr.entities.slice(0, max), count: aggr.count };
      return func(aggr.previous.page + 1).then((page) =>
        recursiveFunction({ previous: page, entities: [...aggr.entities, ...page.results], count: aggr.count })
      );
    };

    return await func()
      .then<PagesAggr>((page) => ({ previous: page, entities: page.results, count: page.count }))
      .then(recursiveFunction);
  };

  init = async (): Promise<void> => {
    await Promise.all([
      this.getPagesTillMax(FILMS_MAX, this.swapiService.getFilms).then((films) => {
        this.filmsCount = films.count;
        films.entities.forEach((f) => this.films.add(f.id, f));
      }),

      this.getPagesTillMax(PLANETS_MAX, this.swapiService.getPlanets).then((planets) => {
        this.planetsCount = planets.count;
        planets.entities.forEach((p) => this.planets.add(p.id, p));
      }),

      this.swapiService.getPeople().then((people) => {
        this.peopleCount = people.count;
        people.results.forEach((p) => this.people.add(p.id, p));
      }),

      this.swapiService.getStarships().then((ships) => {
        this.starshipsCount = ships.count;
        ships.results.forEach((s) => this.starships.add(s.id, s));
      })
    ])
  };

  protected getEntity = async <T extends Entity>(
    id: string,
    cache: Cache<T>,
    fetcher?: (id: string) => Promise<T>
  ): Promise<T> => {
    if (!fetcher) throw INITIALIZATION_ERROR;
    const cached = cache.get(id);
    return cached ? cached : fetcher(id).then((e) => cache.add(id, e));
  };

  protected cachePage =
    <T extends Entity>(cache: Cache<T>) =>
    (page: EntitiesPage<T>) => {
      page.results.forEach((e) => cache.add(e.id, e));
      return page;
    };

  getFilmsForEntity = async (entity: PartOfFilm): Promise<Film[]> => Promise.all(entity.films.map(this.getFilm)); // .filter((f) => !!f);

  protected entityToShort = async (entity: PartOfFilm): Promise<ShortEntity> =>
    this.getFilmsForEntity(entity)
      .then((a) => a.map((f) => `${f.name} (${f.releaseDate.getFullYear()})`))
      .catch((e) => {
        console.error(e);
        return [];
      })
      .then((films) => ({
        id: entity.id,
        name: entity.name,
        films: films.filter((f) => !!f)
      }));

  protected fetchListWithFilms = async (page: EntitiesPage<PartOfFilm>): Promise<ShortPage> =>
    Promise.all(page.results.map(this.entityToShort)).then((shorts) => ({
      page: page.page,
      previous: page.previous,
      next: page.next,
      result: shorts
    }));

  getPlanet = async (id: string): Promise<Planet> => this.getEntity(id, this.planets, this.swapiService?.getPlanet);

  getPerson = async (id: string): Promise<Person> => this.getEntity(id, this.people, this.swapiService?.getPerson);

  getFilm = async (id: string): Promise<Film> => this.getEntity(id, this.films, this.swapiService?.getFilm);

  getStarship = async (id: string): Promise<Starship> =>
    this.getEntity(id, this.starships, this.swapiService?.getStarship);

  getPeople = async (page?: number): Promise<ShortPage> =>
    this.swapiService?.getPeople(page).then(this.cachePage(this.people)).then(this.fetchListWithFilms) ??
    Promise.reject(INITIALIZATION_ERROR);

  getPlanets = async (page?: number): Promise<ShortPage> =>
    this.swapiService?.getPlanets(page).then(this.cachePage(this.planets)).then(this.fetchListWithFilms) ??
    Promise.reject(INITIALIZATION_ERROR);

  getStarships = async (page?: number): Promise<ShortPage> =>
    this.swapiService?.getStarships(page).then(this.cachePage(this.starships)).then(this.fetchListWithFilms) ??
    Promise.reject(INITIALIZATION_ERROR);

  getPlanetsCount = (): number | undefined => this.planetsCount;

  getFilmsCount = (): number | undefined => this.filmsCount;

  getPeopleCount = (): number | undefined => this.peopleCount;

  getStarshipsCount = (): number | undefined => this.starshipsCount;
}
