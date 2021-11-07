import * as Swapi from "../swapiModels";
import { Entity, Person, Planet, Starship, EntitiesPage, Film, PartOfFilm } from "../../models/entities";

export const urlToId = (url: string): string => {
  const match = url.match(/^.+\/api\/\w+\/(\d+)\//);
  if (!match || match?.length !== 2) throw new Error(`Entities reference is broken: ${url}`);
  return match[1];
};

export const urlToPage = (url: string): number => {
  const error = () => {
    throw new Error(`Entities page reference is broken: ${url}`);
  };
  const match = url.match(/^.+\/api\/\w+\/(\?page=(\d*))?/);
  if (!match || match?.length !== 3 || match[0] !== url) return error();
  if (match[1] === undefined && match[2] === undefined) return 1;
  if (!match[1]?.startsWith("?page=")) return error();
  const res = Number(match[2]);
  if (Number.isNaN(res) || res < 1) return error();
  return res;
};

export const convertToNumber = (str: string | undefined): number | undefined => {
  if (str === undefined) return undefined;
  let input = str.toLowerCase().trim();
  if (!input || input === "undefined") return undefined;
  if (input === "n/a") return NaN;
  if (input === "indefinite") return Number.MAX_VALUE;
  const range = input.indexOf("-");
  if (range > 0) {
    input = input.substring(0, range);
  }
  input = input.replace(",", ".");
  return Number(input);
};

export const convertEntity = (entity: Swapi.Entity): Entity => ({
  id: urlToId(entity.url),
  name: entity.name ?? entity.title ?? "",
  created: new Date(Date.parse(entity.created)),
  edited: new Date(Date.parse(entity.edited))
});

const convertPartOfFilm = (entity: Swapi.Entity): PartOfFilm => ({
  ...convertEntity(entity),
  films: entity.films?.map(urlToId) || []
});

export const convertPerson = (person: Swapi.Person): Person => ({
  ...convertPartOfFilm(person),
  birthYear: person.birth_year,
  eyeColor: person.eye_color,
  gender: person.gender,
  hairColor: person.hair_color,
  height: convertToNumber(person.height) ?? 0,
  mass: convertToNumber(person.mass) ?? 0,
  skinColor: person.skin_color,
  homeworld: urlToId(person.homeworld),
  species: person.species.map(urlToId),
  starships: person.starships.map(urlToId),
  vehicles: person.vehicles.map(urlToId)
});

export const convertPlanet = (planet: Swapi.Planet): Planet => ({
  ...convertPartOfFilm(planet),
  climate: planet.climate,
  diameter: convertToNumber(planet.diameter) || NaN,
  gravity: planet.gravity,
  orbitalPeriod: convertToNumber(planet.orbital_period) || NaN,
  population: convertToNumber(planet.population),
  rotationPeriod: convertToNumber(planet.rotation_period) || NaN,
  surfaceWater: convertToNumber(planet.surface_water) ?? NaN,
  terrain: planet.terrain,
  residents: planet.residents.map(urlToId)
});

export const convertStarship = (ship: Swapi.Starship): Starship => ({
  ...convertPartOfFilm(ship),
  cargoCapacity: ship.cargo_capacity,
  consumables: ship.consumables,
  cost: convertToNumber(ship.cost_in_credits) ?? NaN,
  crew: convertToNumber(ship.crew) ?? NaN,
  hyperdriveRating: convertToNumber(ship.hyperdrive_rating) ?? NaN,
  length: convertToNumber(ship.length) || NaN,
  manufacturer: ship.manufacturer,
  maxAtmospheringSpeed: convertToNumber(ship.max_atmosphering_speed),
  MGLT: convertToNumber(ship.MGLT) ?? NaN,
  model: ship.model,
  passengers: convertToNumber(ship.passengers) ?? NaN,
  pilots: ship.pilots?.map(urlToId) || [],
  starshipClass: ship.starship_class
});

export const convertFilm = (film: Swapi.Film): Film => ({
  ...convertEntity(film),
  characters: film.characters.map(urlToId),
  director: film.director,
  episodeNumber: film.episode_id,
  openingCrawl: film.opening_crawl,
  planets: film.planets.map(urlToId),
  producer: film.producer,
  releaseDate: new Date(Date.parse(film.release_date)),
  species: film.species.map(urlToId),
  starships: film.starships.map(urlToId),
  vehicles: film.vehicles.map(urlToId)
});

export const convertEntities = <T extends Swapi.Entity, P extends Entity>(
  entities: Swapi.EntitiesPage<T>,
  convert: (e: T) => P,
  page: number = 1
): EntitiesPage<P> => {
  if (page < 1 || !Number.isInteger(page)) throw Error(`Invalid page value ${page}: page should be intger > 0!`);
  if (entities.count < 0 || !Number.isInteger(entities.count))
    throw Error(
      `Invalid entities count ${entities.count} input page ${page}: entities count should be positive integer!`
    );
  return {
    count: entities.count,
    page,
    next: !!entities.next,
    previous: !!entities.previous,
    results: entities.results.map(convert)
  };
};

export type ConvertorFunction<T extends Swapi.Entity, P extends Entity> = (
  page: number
) => (entities: Swapi.EntitiesPage<T>) => EntitiesPage<P>;

export const convertPeople: ConvertorFunction<Swapi.Person, Person> =
  (page: number) => (entities: Swapi.EntitiesPage<Swapi.Person>) =>
    convertEntities<Swapi.Person, Person>(entities, convertPerson, page);

export const convertPlanets: ConvertorFunction<Swapi.Planet, Planet> =
  (page: number) => (entities: Swapi.EntitiesPage<Swapi.Planet>) =>
    convertEntities<Swapi.Planet, Planet>(entities, convertPlanet, page);

export const convertStarships: ConvertorFunction<Swapi.Starship, Starship> =
  (page: number) => (entities: Swapi.EntitiesPage<Swapi.Starship>) =>
    convertEntities<Swapi.Starship, Starship>(entities, convertStarship, page);

export const convertFilms: ConvertorFunction<Swapi.Film, Film> =
  (page: number) => (entities: Swapi.EntitiesPage<Swapi.Film>) =>
    convertEntities<Swapi.Film, Film>(entities, convertFilm, page);
