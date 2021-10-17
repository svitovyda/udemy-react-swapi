export interface Entity {
  // ID of the entity
  id: string;
  // Name or title of the entity
  name: string;
  // The ISO 8601 date format of the time that this resource was created
  created: Date;
  // The ISO 8601 date format of the time that this resource was edited
  edited: Date;
}

export interface PartOfFilm extends Entity {
  // An array of Film id that this entity has appeared in
  films: string[];
}

/**
 * A Star Wars film
 */
export interface Film extends Entity {
  // The people resources featured within this film
  characters: string[];
  // The director of this film
  director: string;
  //The episode number of this film (episideId)
  episodeNumber: number;
  //The opening crawl text at the beginning of this film
  openingCrawl: string;
  //The planet resources featured within this film
  planets: string[];
  //The producer(s) of this film
  producer: string;
  //The release date at original creator country
  releaseDate: Date;
  //The species resources featured within this film
  species: string[];
  //The starship resources featured within this film
  starships: string[];
  //The vehicle resources featured within this film
  vehicles: string[];
}

/**
 * A person within the Star Wars universe
 */
export interface Person extends PartOfFilm {
  // The birth year of this person. BBY (Before the Battle of Yavin) or ABY (After the Battle of Yavin)
  birthYear: string;
  // The eye color of this person
  eyeColor: string;
  // The gender of this person (if known)
  gender: string;
  // The hair color of this person
  hairColor?: string;
  // The height of this person in meters
  height: number;
  // The id of the planet resource that this person was born on
  homeworld: string;
  // The mass of this person in kilograms
  mass: number;
  // The skin color of this person
  skinColor: string;
  // The id of the species resource that this person is
  species: string[];
  // An array of starship resources that this person has piloted
  starships: string[];
  // An array of vehicle resources that this person has piloted
  vehicles: string[];
}

/**
 * A planet.
 */
export interface Planet extends PartOfFilm {
  // The climate of this planet. Comma-seperated if diverse
  climate: string;
  // The diameter of this planet in kilometers
  diameter: number;
  // A number denoting the gravity of this planet. Where 1 is normal
  gravity: string;
  // The number of standard days it takes for this planet to complete a single orbit of its local star
  orbitalPeriod: number;
  // The average populationof sentient beings inhabiting this planet
  population?: number;
  // An array of People id Resources that live on this planet
  residents: string[];
  // The number of standard hours it takes for this planet to complete a single rotation on its axis
  rotationPeriod: number;
  // The percentage of the planet surface that is naturally occuring water or bodies of water
  surfaceWater?: number;
  // the terrain of this planet. Comma-seperated if diverse
  terrain: string[];
}

/**
 * A species within the Star Wars universe
 */
export interface Species extends PartOfFilm {
  // The average height of this person in centimeters
  averageHeight?: number;
  // The average lifespan of this species in years
  averageLifespan?: number;
  // The classification of this species
  classification: string;
  // The designation of this species
  designation: string;
  // A comma-seperated string of common eye colors for this species, none if this species does not typically have eyes
  eyeColors: string;
  // A comma-seperated string of common hair colors for this species, none if this species does not typically have hair
  hairColors: string;
  // The id of a planet resource, a planet that this species originates from
  homeworld: string;
  // The language commonly spoken by this species
  language: string;
  // An array of People id Resources that are a part of this species
  people: string[];
  // A comma-seperated string of common skin colors for this species, none if this species does not typically have skin
  skinColors: string;
}

/**
 * A Starship
 */
export interface Starship extends PartOfFilm {
  // The maximum number of kilograms that this starship can transport
  cargoCapacity: string;
  // The maximum length of time that this starship can provide consumables for its entire crew without having to resupply
  consumables: string;
  // The cost of this starship new, in galactic credits
  cost: number;
  // The number of personnel needed to run or pilot this starship
  crew: number;
  // The class of this starships hyperdrive
  hyperdriveRating: number;
  // The length of this starship in meters
  length: number;
  // The manufacturer of this starship. Comma seperated if more than one
  manufacturer: string;
  // The maximum speed of this starship in atmosphere. n/a if this starship is incapable of atmosphering flight
  maxAtmospheringSpeed?: number;
  // The Maximum number of Megalights this starship can travel in a standard hour. A Megalight is a standard unit of
  // distance and has never been defined before within the Star Wars universe. This figure is only really useful for
  // measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth
  MGLT?: number;
  // The model or official name of this starship. Such as T-65 X-wing or DS-1 Orbital Battle Station
  model: string;
  // The number of non-essential people this starship can transport
  passengers?: number;
  // An array of People id Resources that this starship has been piloted by
  pilots: string[];
  // The class of this starship, such as Starfighter or Deep Space Mobile Battlestation
  starshipClass: string;
}

/**
 * A Vehicle.
 */
export interface Vehicle extends PartOfFilm {
  // The maximum number of kilograms that this vehicle can transport
  cargoCapacity: string;
  // The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply
  consumables: string;
  // The cost of this vehicle new, in galactic credits
  costInCredits: string;
  // The number of personnel needed to run or pilot this vehicle
  crew: string;
  // The length of this vehicle in meters.
  length: string;
  // The manufacturer of this vehicle. Comma seperated if more than one
  manufacturer: string;
  // The maximum speed of this vehicle in atmosphere.
  maxAtmospheringSpeed: string;
  // The model or official name of this vehicle. Such as All Terrain Attack Transport
  model: string;
  // The number of non-essential people this vehicle can transport
  passengers: string;
  // An array of People id Resources that this vehicle has been piloted by
  pilots: string[];
  // The class of this vehicle, such as Wheeled
  vehicleClass: string;
}

/**
 * A one page of the list of <Entities>
 */

export interface EntitiesPage<T extends Entity> {
  page: number;
  count: number;
  next: boolean;
  previous: boolean;
  results: Array<T>;
}
