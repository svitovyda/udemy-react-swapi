import React from "react";
import { ErrorIndicator } from "./ErrorIndicator";
export interface WithErrorProps extends React.HTMLAttributes<HTMLElement> {
  error?: Error | string | boolean;
}

export const WithError: React.FC<WithErrorProps> = (props: WithErrorProps) => {
  if (!props.error) return <>{props.children}</>;
  if (props.error !== true && props.error !== "") {
    const errorObj = typeof props.error === "object" ? props.error : new Error(props.error);
    console.error(errorObj);
  }
  return <ErrorIndicator />
};

WithError.displayName = "WithError";
