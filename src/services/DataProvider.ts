import { EntitiesPage, Entity, Film, Person, Planet, Starship } from "../models/entities";
import { Cache } from "./helpers/Cache";
import { SwapiService } from "./SwapiService";

const PLANETS_MAX = 100;
const FILMS_MAX = 100;
const ENTITY_MAX = 20;

interface EntitiesWithInfo<T extends Entity> {
  entities: T[];
  count: number;
}

export class DataProvider {
  protected films: Cache<Film> = new Cache(FILMS_MAX);
  protected filmsCount?: number;
  protected planets: Cache<Planet> = new Cache(PLANETS_MAX);
  protected planetsCount?: number;
  protected people: Cache<Person> = new Cache(ENTITY_MAX);
  protected peopleCount?: number;
  protected starships: Cache<Starship> = new Cache(ENTITY_MAX);
  protected starshipsCount?: number;

  protected swapiService: SwapiService;

  private static instance: DataProvider;

  private constructor(swapiService: SwapiService) {
    this.swapiService = swapiService;
  }

  static getInstance = (swapiService: SwapiService): DataProvider => {
    if (!DataProvider.instance) {
      DataProvider.instance = new DataProvider(swapiService);
    }
    return DataProvider.instance;
  };

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

  init = async () => {
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
    ]);
  };

  protected getEntity = async <T extends Entity>(
    id: string,
    cache: Cache<T>,
    fetcher: (id: string) => Promise<T>
  ): Promise<T> => {
    const cached = cache.get(id);
    return cached ? cached : fetcher(id).then((e) => cache.add(id, e));
  };

  protected cachePage =
    <T extends Entity>(cache: Cache<T>) =>
    (page: EntitiesPage<T>) => {
      page.results.forEach((e) => cache.add(e.id, e));
      return page;
    };

  getPlanet = async (id: string): Promise<Planet> => this.getEntity(id, this.planets, this.swapiService.getPlanet);

  getPerson = async (id: string): Promise<Person> => this.getEntity(id, this.people, this.swapiService.getPerson);

  getFilm = async (id: string): Promise<Film> => this.getEntity(id, this.films, this.swapiService.getFilm);

  getStarship = async (id: string): Promise<Starship> =>
    this.getEntity(id, this.starships, this.swapiService.getStarship);

  getPeople = async (page?: number): Promise<EntitiesPage<Person>> =>
    this.swapiService.getPeople(page).then(this.cachePage(this.people));

  getPlanets = async (page?: number): Promise<EntitiesPage<Planet>> =>
    this.swapiService.getPlanets(page).then(this.cachePage(this.planets));

  getStarships = async (page?: number): Promise<EntitiesPage<Starship>> =>
    this.swapiService.getStarships(page).then(this.cachePage(this.starships));

  getPlanetsCount = (): number | undefined => this.planetsCount;

  getFilmsCount = (): number | undefined => this.filmsCount;

  getPeopleCount = (): number | undefined => this.peopleCount;

  getStarshipsCount = (): number | undefined => this.starshipsCount;
}
