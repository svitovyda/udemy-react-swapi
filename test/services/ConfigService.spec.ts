import { ConfigService } from "../../src/services/ConfigService"

describe("ConfigService", () => {
  it("should return Config", () => {
    expect(ConfigService.getConfig()).toEqual({
      baseUrl: "swapi.dev"
    });
  })
});
