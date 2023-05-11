import { when } from "jest-when";
import type { Config } from "../../src/services/ConfigService";
import { SwapiService } from "../../src/services/SwapiService";
import type { RemoteFetcher } from "../../src/services/SwapiService";
import * as Swapi from "../../src/services/swapiModels";
import * as films from "../__mock__/films.json";
import * as peopleJsonP1 from "../__mock__/people1.json";
import * as peopleJsonP2 from "../__mock__/people2.json";
import * as planetsJsonP1 from "../__mock__/planets1.json";
import * as planetsJsonP2 from "../__mock__/planets2.json";
import * as R from "../__mock__/results";
import * as starshipsJsonP1 from "../__mock__/starships1.json";
import * as starshipsJsonP4 from "../__mock__/starships4.json";

const peopleJsonTyped = peopleJsonP1 as any as Swapi.EntitiesPage<Swapi.Person>;
const planetsJsonTyped = planetsJsonP1 as any as Swapi.EntitiesPage<Swapi.Planet>;
const starshipsJsonTyped = starshipsJsonP1 as any as Swapi.EntitiesPage<Swapi.Starship>;

const mockFetcher: RemoteFetcher = {
  get: jest.fn()
};

const mockConfig: Config = {
  baseUrl: "testBaseUrl",
  personAssetsUrl: "testPersonAssetsUrl",
  planetAssetsUrl: "testPlanetAssetsUrl",
  starshipAssetsUrl: "testStarshipAssetsUrl"
};

describe("SwapiService", () => {
  const service = new SwapiService(mockConfig, mockFetcher);

  beforeAll(() => {
    const spied = jest.spyOn(mockFetcher, "get");

    when(spied)
      .calledWith("http://testBaseUrl/api/films/")
      .mockReturnValue(films as any);
    when(spied)
      .calledWith("http://testBaseUrl/api/films/?page=2")
      .mockRejectedValue(new Error("404, Not found") as never);
    when(spied)
      .calledWith("http://testBaseUrl/api/films/1/")
      .mockReturnValue(films.results[0] as any);
    when(spied)
      .calledWith("http://testBaseUrl/api/films/a/")
      .mockRejectedValue(new Error("404, Not found") as never);

    when(spied)
      .calledWith("http://testBaseUrl/api/people/")
      .mockReturnValue(peopleJsonP1 as any);
    when(spied)
      .calledWith("http://testBaseUrl/api/people/?page=2")
      .mockReturnValue(peopleJsonP2 as any);
    when(spied)
      .calledWith("http://testBaseUrl/api/people/1/")
      .mockReturnValue(peopleJsonTyped.results[0] as any);
    when(spied)
      .calledWith("http://testBaseUrl/api/people/a/")
      .mockRejectedValue(new Error("404, Not found") as never);

    when(spied)
      .calledWith("http://testBaseUrl/api/planets/")
      .mockReturnValue(planetsJsonP1 as any);
    when(spied)
      .calledWith("http://testBaseUrl/api/planets/?page=2")
      .mockReturnValue(planetsJsonP2 as any);
    when(spied)
      .calledWith("http://testBaseUrl/api/planets/1/")
      .mockReturnValue(planetsJsonTyped.results[0] as any);
    when(spied)
      .calledWith("http://testBaseUrl/api/planets/a/")
      .mockRejectedValue(new Error("404, Not found") as never);

    when(spied)
      .calledWith("http://testBaseUrl/api/starships/")
      .mockReturnValue(starshipsJsonP1 as any);
    when(spied)
      .calledWith("http://testBaseUrl/api/starships/?page=4")
      .mockReturnValue(starshipsJsonP4 as any);
    when(spied)
      .calledWith("http://testBaseUrl/api/starships/2/")
      .mockReturnValue(starshipsJsonTyped.results[0] as any);
    when(spied)
      .calledWith("http://testBaseUrl/api/starships/a/")
      .mockRejectedValue(new Error("404, Not found") as never);
  });

  afterAll(() => {});

  it("getFilm, getFilms", async () => {
    await expect(service.getFilm("1")).resolves.toEqual(R.films.results[0]);
    await expect(service.getFilm("a")).rejects.toThrow("404, Not found");

    await expect(service.getFilms(-2)).rejects.toThrow("Invalid page value -2: page should be intger > 0!");
    await expect(service.getFilms(0)).rejects.toThrow("Invalid page value 0: page should be intger > 0!");
    await expect(service.getFilms(10.6)).rejects.toThrow("Invalid page value 10.6: page should be intger > 0!");
    await expect(service.getFilms()).resolves.toEqual(R.films);
    await expect(service.getFilms(1)).resolves.toEqual(R.films);
    await expect(service.getFilms(2)).rejects.toThrow("404, Not found");
  });

  it("getPerson, getPeople", async () => {
    await expect(service.getPerson("1")).resolves.toEqual(R.peoplePage1.results[0]);
    await expect(service.getPerson("a")).rejects.toThrow("404, Not found");

    await expect(service.getPeople(-2)).rejects.toThrow("Invalid page value -2: page should be intger > 0!");
    await expect(service.getPeople(0)).rejects.toThrow("Invalid page value 0: page should be intger > 0!");
    await expect(service.getPeople(10.6)).rejects.toThrow("Invalid page value 10.6: page should be intger > 0!");
    await expect(service.getPeople()).resolves.toEqual(R.peoplePage1);
    await expect(service.getPeople(1)).resolves.toEqual(R.peoplePage1);
    await expect(service.getPeople(2)).resolves.toEqual(R.peoplePage2);
  });

  it("getPlanet, getPlanets", async () => {
    await expect(service.getPlanet("1")).resolves.toEqual(R.planetsPage1.results[0]);
    await expect(service.getPlanet("a")).rejects.toThrow("404, Not found");

    await expect(service.getPlanets(-2)).rejects.toThrow("Invalid page value -2: page should be intger > 0!");
    await expect(service.getPlanets(0)).rejects.toThrow("Invalid page value 0: page should be intger > 0!");
    await expect(service.getPlanets(10.6)).rejects.toThrow("Invalid page value 10.6: page should be intger > 0!");
    await expect(service.getPlanets()).resolves.toEqual(R.planetsPage1);
    await expect(service.getPlanets(1)).resolves.toEqual(R.planetsPage1);
    await expect(service.getPlanets(2)).resolves.toEqual(R.planetsPage2);
  });

  it("getStarship, getStarships", async () => {
    await expect(service.getStarship("2")).resolves.toEqual(R.starshipsPage1.results[0]);
    await expect(service.getStarship("a")).rejects.toThrow("404, Not found");

    await expect(service.getStarships(-2)).rejects.toThrow("Invalid page value -2: page should be intger > 0!");
    await expect(service.getStarships(0)).rejects.toThrow("Invalid page value 0: page should be intger > 0!");
    await expect(service.getStarships(10.6)).rejects.toThrow("Invalid page value 10.6: page should be intger > 0!");
    await expect(service.getStarships()).resolves.toEqual(R.starshipsPage1);
    await expect(service.getStarships(4)).resolves.toEqual(R.starsipsPage4);
  });
});
