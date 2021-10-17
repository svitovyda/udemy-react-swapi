import ConfigFile from "../../config/config.json"

export interface Config {
  baseUrl: string;
}
export class ConfigService {
  static getConfig(): Config {
    return {
      baseUrl: (ConfigFile.serverUrl) ?? "swapi.dev"
    };
  }
}
