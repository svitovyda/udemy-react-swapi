import configJson from "config";

export interface Config {
  baseUrl: string;
  planetAssetsUrl?: string;
  personAssetsUrl?: string;
  starshipAssetsUrl?: string;
}
export const ConfigService = {
  getConfig(): Config {
    return {
      baseUrl: configJson.serverUrl ?? "swapi.dev",
      planetAssetsUrl:
        configJson.imagesBaseUrl && configJson.planetAssets
          ? `http://${configJson.imagesBaseUrl}/${configJson.planetAssets}`
          : "",
      personAssetsUrl:
        configJson.imagesBaseUrl && configJson.planetAssets
          ? `http://${configJson.imagesBaseUrl}/${configJson.personAssets}`
          : "",
      starshipAssetsUrl:
        configJson.imagesBaseUrl && configJson.planetAssets
          ? `http://${configJson.imagesBaseUrl}/${configJson.starshipAssets}`
          : ""
    };
  }
};
