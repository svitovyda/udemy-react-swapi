import * as React from "react";
import styled from "@emotion/styled";
import { RandomPlanet } from "../planets/RandomPlanet";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  marginTop: "2",
  width: "100%"
});

export const MainPage: React.FC = React.memo(() => {
  return (
    <Container>
      <RandomPlanet />
    </Container>
  );
});

MainPage.displayName = "MainPage";
