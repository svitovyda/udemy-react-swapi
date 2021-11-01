import { ConfigService } from "../../src/services/ConfigService"

describe("ConfigService", () => {
  it("should return Config", () => {
    expect(ConfigService.getConfig()).toEqual({
      baseUrl: "swapi.dev",
      planetAssetsUrl: "http://starwars-visualguide.com/assets/img/planets"
    });
  })
});
