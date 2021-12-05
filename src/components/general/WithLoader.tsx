import React from "react";
import styled from "@emotion/styled";
import { LoaderAnimation } from "./LoaderAnimation";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%"
});

export interface WithLoaderProps extends React.HTMLAttributes<HTMLElement> {
  loading?: boolean;
}

export const WithLoader = React.memo((props: WithLoaderProps) => {
  return props.loading ? (
    <Container>
      <LoaderAnimation />
    </Container>
  ) : (
    <>{props.children}</>
  );
});

WithLoader.displayName = "WithLoader";
