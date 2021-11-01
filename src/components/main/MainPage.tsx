import * as React from "react";
import styled from "@emotion/styled";
import { RandomPlanetScreen } from "../planets/RandomPlanetScreen";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  marginTop: "3%",
  width: "100%"
});

export const MainPage: React.FC = () => {
  return (
    <Container>
      <RandomPlanetScreen />
    </Container>
  );
};

MainPage.displayName = "MainPage";
