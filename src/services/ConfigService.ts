import ConfigFile from "../../config/config.json";

export interface Config {
  baseUrl: string;
  planetAssetsUrl?: string;
  personAssetsUrl?: string;
  starshipAssetsUrl?: string;
}
export class ConfigService {
  static getConfig(): Config {
    return {
      baseUrl: ConfigFile.serverUrl ?? "swapi.dev",
      planetAssetsUrl:
        ConfigFile.imagesBaseUrl && ConfigFile.planetAssets
          ? `http://${ConfigFile.imagesBaseUrl}/${ConfigFile.planetAssets}`
          : "",
      personAssetsUrl:
        ConfigFile.imagesBaseUrl && ConfigFile.planetAssets
          ? `http://${ConfigFile.imagesBaseUrl}/${ConfigFile.personAssets}`
          : "",
      starshipAssetsUrl:
        ConfigFile.imagesBaseUrl && ConfigFile.planetAssets
          ? `http://${ConfigFile.imagesBaseUrl}/${ConfigFile.starshipAssets}`
          : ""
    };
  }
}
