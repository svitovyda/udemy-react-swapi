import React from "react";
import { ErrorIndicator } from "./ErrorIndicator";

export interface WithErrorProperties extends React.HTMLAttributes<HTMLElement> {
  error?: Error | string | boolean;
}

export const WithError: React.FC<WithErrorProperties> = (properties: WithErrorProperties) => {
  if (!properties.error) return <>{properties.children}</>;
  if (properties.error !== true && properties.error !== "") {
    const errorObject = typeof properties.error === "object" ? properties.error : new Error(properties.error);
    console.error(errorObject);
  }
  return <ErrorIndicator />;
};

WithError.displayName = "WithError";
