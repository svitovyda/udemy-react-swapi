import * as React from "react";
import styled from "@emotion/styled";
import { ConfigService } from "../../services/ConfigService";
import {rgba} from "emotion-rgba"

// random-planet jumbotron rounded
const Container = styled.div({
  display: "flex",
  padding: "1rem",
  backgroundColor: "#0a0a0a",
  borderRadius: 10
});

const PlanetImage = styled.img({
  width: 500,
  height: 500,
  marginRight: "1rem",
  borderRadius: 10,
  objectFit: "cover"
});

const PlanetInfo = styled.div({
  display: "flex",
  flexDirection: "column",
  paddingLeft: 30
});

const PlanetName = styled.h4({
  fontSize: "0.9rem",
  textAlign: "center",
  fontFamily: "'Open Sans', sans-serif",
  margin: "0 auto",
  color: rgba("#f1e9e9", 0.459),
  textTransform: "uppercase"
});

export const RandomPlanet: React.FC = () => {
  const settings = ConfigService.getConfig();
  return (
    <Container>
      <PlanetImage src={`${settings.planetAssetsUrl}/${Math.ceil(Math.random() * 200)}.jpg}`} />
      <PlanetInfo>
        <PlanetName>Some Random Planet</PlanetName>
      </PlanetInfo>
    </Container>
  );
};

RandomPlanet.displayName = "RandomPlanet";
