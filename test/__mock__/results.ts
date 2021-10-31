import * as M from "../../src/models/entities";

export const films: M.EntitiesPage<M.Film> = {
  count: 6,
  page: 1,
  next: false,
  previous: false,
  results: [
    {
      id: "1",
      name: "A New Hope",
      created: new Date(Date.parse("2014-12-10T14:23:31.880000Z")),
      edited: new Date(Date.parse("2014-12-20T19:49:45.256000Z")),
      characters: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12", "13", "14", "15", "16", "18", "19", "81"],
      director: "George Lucas",
      episodeNumber: 4,
      openingCrawl:
        "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
      planets: ["1", "2", "3"],
      producer: "Gary Kurtz, Rick McCallum",
      releaseDate: new Date(Date.parse("1977-05-25")),
      species: ["1", "2", "3", "4", "5"],
      starships: ["2", "3", "5", "9", "10", "11", "12", "13"],
      vehicles: ["4", "6", "7", "8"]
    },
    {
      id: "2",
      name: "The Empire Strikes Back",
      created: new Date(Date.parse("2014-12-12T11:26:24.656000Z")),
      edited: new Date(Date.parse("2014-12-15T13:07:53.386000Z")),
      characters: ["1", "2", "3", "4", "5", "10", "13", "14", "18", "20", "21", "22", "23", "24", "25", "26"],
      director: "Irvin Kershner",
      episodeNumber: 5,
      openingCrawl:
        "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
      planets: ["4", "5", "6", "27"],
      producer: "Gary Kurtz, Rick McCallum",
      releaseDate: new Date(Date.parse("1980-05-17")),
      species: ["1", "2", "3", "6", "7"],
      starships: ["3", "10", "11", "12", "15", "17", "21", "22", "23"],
      vehicles: ["8", "14", "16", "18", "19", "20"]
    },
    {
      id: "3",
      name: "Return of the Jedi",
      created: new Date(Date.parse("2014-12-18T10:39:33.255000Z")),
      edited: new Date(Date.parse("2014-12-20T09:48:37.462000Z")),
      characters: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "10",
        "13",
        "14",
        "16",
        "18",
        "20",
        "21",
        "22",
        "25",
        "27",
        "28",
        "29",
        "30",
        "31",
        "45"
      ],
      director: "Richard Marquand",
      episodeNumber: 6,
      openingCrawl:
        "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...",
      planets: ["1", "5", "7", "8", "9"],
      producer: "Howard G. Kazanjian, George Lucas, Rick McCallum",
      releaseDate: new Date(Date.parse("1983-05-25")),
      species: ["1", "2", "3", "5", "6", "8", "9", "10", "15"],
      starships: ["2", "3", "10", "11", "12", "15", "17", "22", "23", "27", "28", "29"],
      vehicles: ["8", "16", "18", "19", "24", "25", "26", "30"]
    }
  ]
};

export const peoplePage1: M.EntitiesPage<M.Person> = {
  count: 82,
  page: 1,
  next: true,
  previous: false,
  results: [
    {
      id: "1",
      name: "Luke Skywalker",
      films: ["1", "2", "3", "6"],
      created: new Date(Date.parse("2014-12-09T13:50:51.644000Z")),
      edited: new Date(Date.parse("2014-12-20T21:17:56.891000Z")),
      birthYear: "19BBY",
      eyeColor: "blue",
      gender: "male",
      hairColor: "blond",
      height: 172,
      mass: 77,
      skinColor: "fair",
      homeworld: "1",
      species: [],
      starships: ["12", "22"],
      vehicles: ["14", "30"]
    },
    {
      id: "2",
      name: "C-3PO",
      films: ["1", "2", "3", "4", "5", "6"],
      created: new Date(Date.parse("2014-12-10T15:10:51.357000Z")),
      edited: new Date(Date.parse("2014-12-20T21:17:50.309000Z")),
      birthYear: "112BBY",
      eyeColor: "yellow",
      gender: "n/a",
      hairColor: "n/a",
      height: 167,
      mass: 75,
      skinColor: "gold",
      homeworld: "1",
      species: ["2"],
      starships: [],
      vehicles: []
    }
  ]
};

export const peoplePage2: M.EntitiesPage<M.Person> = {
  count: 82,
  page: 2,
  next: true,
  previous: true,
  results: []
};

export const planetsPage1: M.EntitiesPage<M.Planet> = {
  count: 60,
  page: 1,
  next: true,
  previous: false,
  results: [
    {
      id: "1",
      name: "Tatooine",
      created: new Date(Date.parse("2014-12-09T13:50:49.641000Z")),
      edited: new Date(Date.parse("2014-12-20T20:58:18.411000Z")),
      films: ["1", "3", "4", "5", "6"],
      climate: "arid",
      diameter: 10465,
      gravity: "1 standard",
      orbitalPeriod: 304,
      population: 200000,
      rotationPeriod: 23,
      surfaceWater: 1,
      terrain: ["desert"],
      residents: ["1", "2", "4", "6", "7", "8", "9", "11", "43", "62"]
    },
    {
      id: "2",
      name: "Alderaan",
      created: new Date(Date.parse("2014-12-10T11:35:48.479000Z")),
      edited: new Date(Date.parse("2014-12-20T20:58:18.420000Z")),
      films: ["1", "6"],
      climate: "temperate",
      diameter: 12500,
      gravity: "1 standard",
      orbitalPeriod: 364,
      population: 2000000000,
      rotationPeriod: 24,
      surfaceWater: 40,
      terrain: ["grasslands", "mountains"],
      residents: ["5", "68", "81"]
    }
  ]
};

export const planetsPage2: M.EntitiesPage<M.Planet> = {
  count: 60,
  page: 2,
  next: true,
  previous: true,
  results: []
};

export const starshipsPage1: M.EntitiesPage<M.Starship> = {
  count: 36,
  page: 1,
  next: true,
  previous: false,
  results: [
    {
      id: "2",
      name: "CR90 corvette",
      created: new Date(Date.parse("2014-12-10T14:20:33.369000Z")),
      edited: new Date(Date.parse("2014-12-20T21:23:49.867000Z")),
      films: ["1", "3", "6"],
      cargoCapacity: "3000000",
      consumables: "1 year",
      cost: 3500000,
      crew: 30,
      hyperdriveRating: 2,
      length: 150,
      manufacturer: "Corellian Engineering Corporation",
      maxAtmospheringSpeed: 950,
      MGLT: 60,
      model: "CR90 corvette",
      passengers: 600,
      pilots: [],
      starshipClass: "corvette"
    },
    {
      id: "3",
      name: "Star Destroyer",
      created: new Date(Date.parse("2014-12-10T15:08:19.848000Z")),
      edited: new Date(Date.parse("2014-12-20T21:23:49.870000Z")),
      films: ["1", "2", "3"],
      cargoCapacity: "36000000",
      consumables: "2 years",
      cost: 150000000,
      crew: 47.06,
      hyperdriveRating: 2,
      length: 1.6,
      manufacturer: "Kuat Drive Yards",
      maxAtmospheringSpeed: 975,
      MGLT: 60,
      model: "Imperial I-class Star Destroyer",
      passengers: NaN,
      pilots: [],
      starshipClass: "Star Destroyer"
    }
  ]
};

export const starsipsPage4: M.EntitiesPage<M.Starship> = {
  count: 36,
  page: 4,
  next: false,
  previous: true,
  results: []
};
