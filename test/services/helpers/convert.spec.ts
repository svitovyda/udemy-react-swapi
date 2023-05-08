import * as M from "../../../src/models/entities";
import * as C from "../../../src/services/helpers/convert";
import * as Swapi from "../../../src/services/swapiModels";
import filmsJson from "../../__mock__/films.json";
import peopleJsonP1 from "../../__mock__/people1.json";
import peopleJsonP2 from "../../__mock__/people2.json";
import planetsJsonP1 from "../../__mock__/planets1.json";
import planetsJsonP2 from "../../__mock__/planets2.json";
import * as R from "../../__mock__/results";
import starshipsJsonP1 from "../../__mock__/starships1.json";
import starshipsJsonP4 from "../../__mock__/starships4.json";

describe("convert Swapi to models helpers", () => {
  it("urlToId", () => {
    expect(C.urlToId("www.ttt/api/blah/12/")).toBe("12");
    expect(() => C.urlToId("www.ttt/api/blah/12")).toThrow(Error);
    expect(() => C.urlToId("/blah/23/")).toThrow(Error);
    expect(() => C.urlToId("")).toThrow(Error);
    expect(() => C.urlToId("http://test.server.com/blah/34/")).toThrow(Error);
    expect(() => C.urlToId("http://test.server.com/api/34/")).toThrow(Error);
  });

  it("convertToNumber", () => {
    expect(C.convertToNumber()).toBeUndefined();
    expect(C.convertToNumber("")).toBeUndefined();
    expect(C.convertToNumber("undefined")).toBeUndefined();
    expect(C.convertToNumber("n/a")).toBeNaN();
    expect(C.convertToNumber("2-3")).toBe(2);
    expect(C.convertToNumber("2,3")).toBe(2.3);
    expect(C.convertToNumber("-12,3")).toBe(-12.3);
    expect(C.convertToNumber("2000000000000")).toBe(2_000_000_000_000);
    expect(C.convertToNumber("#FFAA11")).toBeNaN();
    expect(C.convertToNumber("indefinite")).toBe(Number.MAX_VALUE);
  });

  it("urlToPage", () => {
    const error = "Entities page reference is broken: ";
    expect(C.urlToPage("https://swapi.dev/api/people/")).toBe(1);
    expect(C.urlToPage("https://swapi.dev/api/people/?page=1")).toBe(1);
    expect(C.urlToPage("http://sw.dev/api/people/?page=5")).toBe(5);
    expect(() => C.urlToPage("http://sw.dev/api/p/?page=0")).toThrowError(
      new Error(`${error}http://sw.dev/api/p/?page=0`)
    );
    expect(() => C.urlToPage("http://sw.dev/api/p/?page=-3")).toThrowError(
      new Error(`${error}http://sw.dev/api/p/?page=-3`)
    );
    expect(() => C.urlToPage("http://s.de/api/p/?page=xwz")).toThrowError(
      new Error(`${error}http://s.de/api/p/?page=xwz`)
    );
    expect(() => C.urlToPage("www.ttt/api/blah/11")).toThrow(new Error(`${error}www.ttt/api/blah/11`));
    expect(() => C.urlToPage("www.ttt/api/blah/page11")).toThrow(new Error(`${error}www.ttt/api/blah/page11`));
    expect(() => C.urlToPage("www.ttt/api/blah/?page11")).toThrow(new Error(`${error}www.ttt/api/blah/?page11`));
    expect(() => C.urlToPage("www.ttt/api/blah/page=11")).toThrow(new Error(`${error}www.ttt/api/blah/page=11`));
    expect(() => C.urlToPage("www.ttt/api/blah/?page=11/")).toThrow(new Error(`${error}www.ttt/api/blah/?page=11/`));
    expect(() => C.urlToPage("/blah/?page=23")).toThrow(new Error(`${error}/blah/?page=23`));
    expect(() => C.urlToPage("")).toThrow(new Error(`${error}`));
    expect(() => C.urlToPage("http://t.ser.com/b/?page=42")).toThrow(new Error(`${error}http://t.ser.com/b/?page=42`));
    expect(() => C.urlToPage("http://test.com/api/page=24")).toThrow(new Error(`${error}http://test.com/api/page=24`));
  });
});

describe("convert models", () => {
  const films: Swapi.EntitiesPage<Swapi.Film> = filmsJson as any as Swapi.EntitiesPage<Swapi.Film>;
  const date1 = new Date(Date.now() - 1000).toISOString();
  const date2 = new Date(Date.now()).toISOString();

  it("convertEntity", () => {
    const result: M.Entity = {
      id: "2",
      name: "",
      created: new Date(Date.parse(date1)),
      edited: new Date(Date.parse(date2))
    };
    expect(C.convertEntity({ url: "t/api/a/2/", created: date1, edited: date2 })).toEqual(result);
    expect(C.convertEntity({ url: "t/api/a/2/", name: "testN", created: date1, edited: date2 })).toEqual({
      ...result,
      name: "testN"
    });
    expect(
      C.convertEntity({ url: "t/api/a/2/", name: "testN", title: "testT", created: date1, edited: date2 })
    ).toEqual({
      ...result,
      name: "testN"
    });
    expect(C.convertEntity({ url: "t/api/a/2/", name: "", title: "testT", created: date1, edited: date2 })).toEqual({
      ...result,
      name: ""
    });
    expect(C.convertEntity({ url: "t/api/a/2/", title: "testT", created: date1, edited: date2 })).toEqual({
      ...result,
      name: "testT"
    });
    expect(() => C.convertEntity({ url: "tapia2", created: date1, edited: date2 })).toThrow(
      "Entities reference is broken: tapia2"
    );
  });

  it("convertEntities", () => {
    const request: Swapi.EntitiesPage<Swapi.Film> = {
      count: 6,
      next: "next/url",
      previous: "previous/url",
      results: []
    };
    const res: M.EntitiesPage<M.Film> = { count: 6, page: 3, next: true, previous: true, results: [] };
    expect(C.convertEntities(films, C.convertEntity, 4)).toMatchObject({
      count: 6,
      page: 4,
      next: false,
      previous: false
    });
    expect(C.convertEntities({ ...request }, C.convertEntity, 3)).toMatchObject(res);
    expect(C.convertEntities({ ...request, next: "" }, C.convertEntity, 3)).toMatchObject({ ...res, next: false });
    expect(C.convertEntities({ ...request, next: "", previous: "" }, C.convertEntity, 3)).toMatchObject({
      ...res,
      next: false,
      previous: false
    });
    expect(C.convertEntities({ ...request, previous: "" }, C.convertEntity, 3)).toMatchObject({
      ...res,
      previous: false
    });
    expect(() => C.convertEntities({ count: 6, next: null, previous: null, results: [] }, C.convertEntity, -3)).toThrow(
      "Invalid page value -3: page should be intger > 0!"
    );
    expect(() => C.convertEntities({ count: 6, next: null, previous: null, results: [] }, C.convertEntity, 0)).toThrow(
      "Invalid page value 0: page should be intger > 0!"
    );
    expect(() =>
      C.convertEntities({ count: 6, next: null, previous: null, results: [] }, C.convertEntity, 5.7)
    ).toThrow("Invalid page value 5.7: page should be intger > 0!");
    expect(() => C.convertEntities({ count: -6, next: null, previous: null, results: [] }, C.convertEntity)).toThrow(
      "Invalid entities count -6 input page 1: entities count should be positive integer!"
    );
    expect(() => C.convertEntities({ count: 4.6, next: null, previous: null, results: [] }, C.convertEntity)).toThrow(
      "Invalid entities count 4.6 input page 1: entities count should be positive integer!"
    );
  });

  it("convertFilms, and implicitly convertFilm", () => {
    expect(C.convertFilms(1)(films)).toEqual(R.films);
    expect(() => C.convertFilms(0)(films)).toThrow();
  });

  it("convertPeople, and implicitly convertPerson", () => {
    expect(C.convertPeople(1)(peopleJsonP1 as any)).toEqual(R.peoplePage1);
    expect(C.convertPeople(2)(peopleJsonP2 as any)).toEqual(R.peoplePage2);
  });

  it("convertPlanets, and implicitly convertPlanet", () => {
    expect(C.convertPlanets(1)(planetsJsonP1 as any)).toEqual(R.planetsPage1);
    expect(C.convertPlanets(2)(planetsJsonP2 as any)).toEqual(R.planetsPage2);
  });

  it("convertStarships, and implicitly convertStarship", () => {
    expect(C.convertStarships(1)(starshipsJsonP1 as any)).toEqual(R.starshipsPage1);
    expect(C.convertStarships(4)(starshipsJsonP4 as any)).toEqual(R.starsipsPage4);
  });
});
