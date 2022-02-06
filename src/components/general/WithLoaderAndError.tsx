import React from "react";
import { WithError } from "./WithError";
import { WithLoader } from "./withLoader";

export interface WithLoaderAndErrorProps extends React.HTMLAttributes<HTMLElement> {
  loading?: boolean;
  error?: Error | string | boolean;
}

export const WithLoaderAndError: React.FC<WithLoaderAndErrorProps> = (props: WithLoaderAndErrorProps) => {
  return <WithError error={props.error}><WithLoader loading={props.loading}>{props.children}</WithLoader></WithError>
};

WithLoaderAndError.displayName = "WithLoaderAndError";
