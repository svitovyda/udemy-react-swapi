import { ConfigService } from "./ConfigService";
import {
  convertPerson,
  convertPlanet,
  convertStarship,
  convertPeople,
  convertPlanets,
  convertStarships,
  convertFilms
} from "./helpers/convert";
import { Entity, Person, Planet, Starship, EntitiesPage, Film } from "./swapiModels";
import * as Model from "../models/entities";

export interface RemoteFetcher {
  get: <T>(url: string) => Promise<T>;
}

class HTTPFetcher implements RemoteFetcher {
  get = async <T>(url: string): Promise<T> => {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) {
      throw new Error(`Error fetching ${url}: ${res.statusText}`);
    }
    const json = await res.json();
    return json as T;
  };
}

export class SwapiService {
  protected fetcher: RemoteFetcher;
  constructor(fetcher: RemoteFetcher = new HTTPFetcher()) {
    this.fetcher = fetcher;
  }

  protected baseUrl = ConfigService.getConfig().baseUrl;

  protected getResource = async <T>(props: string): Promise<T> => {
    const url = `http://${this.baseUrl}/api/${props}`;
    return this.fetcher.get<T>(url);
  };

  protected getEntityById = async <T extends Entity>(entity: string, id: string): Promise<T> =>
    this.getResource<T>(`${entity}/${id}/`);

  getPerson = async (id: string): Promise<Model.Person> => this.getEntityById<Person>("people", id).then(convertPerson);

  getPlanet = async (id: string): Promise<Model.Planet> =>
    this.getEntityById<Planet>("planets", id).then(convertPlanet);

  getStarship = async (id: string): Promise<Model.Starship> =>
    this.getEntityById<Starship>("starships", id).then(convertStarship);

  protected getPage = async <T extends Entity>(entity: string, page: number = 1): Promise<EntitiesPage<T>> => {
    const pageProp = page !== 1 ? `?page=${page}` : "";
    return await this.getResource<EntitiesPage<T>>(`${entity}/${pageProp}`);
  };

  getPeople = async (page: number = 1) => this.getPage<Person>("people", page).then(convertPeople(page));

  getPlanets = async (page: number = 1) => this.getPage<Planet>("planets", page).then(convertPlanets(page));

  getStarships = async (page: number = 1) => this.getPage<Starship>("starships", page).then(convertStarships(page));

  getFilms = async (page: number = 1) => this.getPage<Film>("films", page).then(convertFilms(page));
}
