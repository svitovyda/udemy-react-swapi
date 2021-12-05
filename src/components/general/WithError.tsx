import React from "react";
import styled from "@emotion/styled";
import { ErrorIndicator } from "./ErrorIndicator";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%"
});

export interface WithErrorProps extends React.HTMLAttributes<HTMLElement> {
  error?: Error;
}

export const WithError = React.memo((props: WithErrorProps) => {
  if (props.error) {
    console.error(props.error);
    return (
      <Container>
        <ErrorIndicator />
      </Container>
    );
  }
  return <>{props.children}</>;
});

WithError.displayName = "WithError";
