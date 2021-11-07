import React from "react";
import styled from "@emotion/styled";
import { Spinner } from "./Spinner";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%"
});

export interface WithLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
}

export const WithLoader: React.FC<WithLoaderProps> = React.memo((props: WithLoaderProps) => {
  return props.isLoading ? (
    <Container>
      <Spinner />
    </Container>
  ) : (
    <>{props.children}</>
  );
});

WithLoader.displayName = "WithLoader";
