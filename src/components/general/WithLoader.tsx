import React from "react";
import { LoaderAnimation } from "./LoaderAnimation";

export interface WithLoaderProperties extends React.HTMLAttributes<HTMLElement> {
  loading?: boolean;
}

export const WithLoader: React.FC<WithLoaderProperties> = (properties: WithLoaderProperties) => {
  return properties.loading ? <LoaderAnimation /> : <>{properties.children}</>;
};

WithLoader.displayName = "WithLoader";
