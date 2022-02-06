import React from "react";
import { LoaderAnimation } from "./LoaderAnimation";
export interface WithLoaderProps extends React.HTMLAttributes<HTMLElement> {
  loading?: boolean;
}

export const WithLoader: React.FC<WithLoaderProps> = (props: WithLoaderProps) => {
  return props.loading ? (
    <LoaderAnimation />
  ) : (
    <>{props.children}</>
  );
};

WithLoader.displayName = "WithLoader";
