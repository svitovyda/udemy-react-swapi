import { ConfigJson } from "./models/ConfigJson";

declare module "config" {
  const value: ConfigJson;
  export default value;
}
