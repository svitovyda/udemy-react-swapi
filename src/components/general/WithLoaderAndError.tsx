import React from "react";
import { WithError } from "./WithError";
import { WithLoader } from "./withLoader";

export interface WithLoaderAndErrorProperties extends React.HTMLAttributes<HTMLElement> {
  loading?: boolean;
  error?: Error | string | boolean;
}

export const WithLoaderAndError: React.FC<WithLoaderAndErrorProperties> = (
  properties: WithLoaderAndErrorProperties
) => {
  return (
    <WithError error={properties.error}>
      <WithLoader loading={properties.loading}>{properties.children}</WithLoader>
    </WithError>
  );
};

WithLoaderAndError.displayName = "WithLoaderAndError";
