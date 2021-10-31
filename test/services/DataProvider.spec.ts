import { DataProvider } from "../../src/services/DataProvider";
import { SwapiService } from "../../src/services/SwapiService";
import * as R from "../__mock__/results";

const mock = jest.fn<SwapiService, any[]>(() => ({
  getPerson: jest.fn(() => Promise.resolve(R.peoplePage1.results[0])),
  getPlanet: jest.fn(() => Promise.resolve(R.planetsPage1.results[0])),
  getStarship: jest.fn(() => Promise.resolve(R.starshipsPage1.results[0])),
  getFilm: jest.fn(() => Promise.resolve(R.films.results[0])),
  getPeople: jest.fn(() => Promise.resolve(R.peoplePage1)),
  getPlanets: jest.fn((page?: number) => {
    if (page && page === 2) return Promise.resolve({ ...R.planetsPage2, results: [{...R.planetsPage1.results[1], id: "id2021"}] });
    return Promise.resolve(R.planetsPage1);
  }),
  getStarships: jest.fn(() => Promise.resolve(R.starshipsPage1)),
  getFilms: jest.fn(() => Promise.resolve(R.films))
} as any));

describe("DataProvider", () => {
  const service = mock();
  const dataProvider = DataProvider.getInstance(service);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("init", async () => {
    await dataProvider.init();

    await expect(dataProvider.getPerson("1")).resolves.toEqual(R.peoplePage1.results[0]);
    expect(service.getPerson).toHaveBeenCalledTimes(0);
    await expect(dataProvider.getPerson("a")).resolves.toEqual(R.peoplePage1.results[0]);
    expect(service.getPerson).toHaveBeenCalledTimes(1);
    (service.getPerson as jest.Mock).mockClear();
    await expect(dataProvider.getPerson("a")).resolves.toEqual(R.peoplePage1.results[0]);
    expect(service.getPerson).toHaveBeenCalledTimes(0);

    await expect(dataProvider.getStarship("2")).resolves.toEqual(R.starshipsPage1.results[0]);
    expect(service.getStarship).toHaveBeenCalledTimes(0);
    await expect(dataProvider.getStarship("a")).resolves.toEqual(R.starshipsPage1.results[0]);
    expect(service.getStarship).toHaveBeenCalledTimes(1);
    (service.getStarship as jest.Mock).mockClear();
    await expect(dataProvider.getStarship("a")).resolves.toEqual(R.starshipsPage1.results[0]);
    expect(service.getStarship).toHaveBeenCalledTimes(0);

    await expect(dataProvider.getFilm("1")).resolves.toEqual(R.films.results[0]);
    expect(service.getFilm).toHaveBeenCalledTimes(0);
    await expect(dataProvider.getFilm("a")).resolves.toEqual(R.films.results[0]);
    expect(service.getFilm).toHaveBeenCalledTimes(1);
    (service.getFilm as jest.Mock).mockClear();
    await expect(dataProvider.getFilm("a")).resolves.toEqual(R.films.results[0]);
    expect(service.getFilm).toHaveBeenCalledTimes(0);

    await expect(dataProvider.getPlanet("1")).resolves.toEqual(R.planetsPage1.results[0]);
    expect(service.getPlanet).toHaveBeenCalledTimes(0);
    await expect(dataProvider.getPlanet("id2021")).resolves.toEqual({ ...R.planetsPage1.results[1], id: "id2021" });
    expect(service.getPlanet).toHaveBeenCalledTimes(0);
    await expect(dataProvider.getPlanet("a")).resolves.toEqual(R.planetsPage1.results[0]);
    expect(service.getPlanet).toHaveBeenCalledTimes(1);
    (service.getPlanet as jest.Mock).mockClear();
    await expect(dataProvider.getPlanet("a")).resolves.toEqual(R.planetsPage1.results[0]);
    expect(service.getPlanet).toHaveBeenCalledTimes(0);

    expect(dataProvider.getPeopleCount()).toBe(82);
    expect(dataProvider.getFilmsCount()).toBe(6);
    expect(dataProvider.getPlanetsCount()).toBe(60);
    expect(dataProvider.getStarshipsCount()).toBe(36);
  });
});
