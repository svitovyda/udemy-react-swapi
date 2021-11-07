import * as React from "react";
import styled from "@emotion/styled";
import { RandomPlanetController } from "../planets/RandomPlanetController";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  marginTop: "2",
  width: "100%"
});

export const MainPage: React.FC = () => {
  return (
    <Container>
      <RandomPlanetController />
    </Container>
  );
};

MainPage.displayName = "MainPage";
