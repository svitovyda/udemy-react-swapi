import ConfigFile from "../../config/config.json"

export interface Config {
  baseUrl: string;
  planetAssetsUrl?: string
}
export class ConfigService {
  static getConfig(): Config {
    return {
      baseUrl: ConfigFile.serverUrl ?? "swapi.dev",
      planetAssetsUrl: ConfigFile.imagesBaseUrl ?? `$https://${ConfigFile.imagesBaseUrl}/{ConfigFile.planetAssets}`
    };
  }
}
