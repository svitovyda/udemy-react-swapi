import * as React from "react";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";
import { Planet } from "../../models/entities";

// random-planet jumbotron rounded
const Container = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  width: "100%",
  padding: "1rem",
  backgroundColor: "#0a0a0a",
  borderRadius: 10
});

const PlanetImage = styled.img({
  width: 100,
  height: 100,
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

const RandomButton = styled.button({
  backgroundColor: "#0a0a0a",
  borderRadius: 10,
  outline: "none",
  borderStyle: "none",
  height: 50,
  width: 150,
  fontFamily: "'Open Sans', sans-serif",
  color: rgba("#f1e9e9", 0.459),
  textDecoration: "none",
  cursor: "pointer",
  marginLeft: "auto",
  ":hover": {
    color: "white"
  }
});

export interface RandomPlanetProps {
  planet?: Planet;
  imageUrl?: string;
  onShowRanomPlanet?: () => void;
}

export const RandomPlanet: React.FC<RandomPlanetProps> = (props: RandomPlanetProps) => {
  const onButtonClick = React.useCallback(() => {
    if (props.onShowRanomPlanet) props.onShowRanomPlanet();
  }, [props.onShowRanomPlanet]);

  return (
    <Container>
      {props.planet ? (
        <>
          <PlanetImage src={props.imageUrl} alt={props.planet.name} />
          <PlanetInfo>
            <PlanetName>{props.planet.name}</PlanetName>
          </PlanetInfo>
        </>
      ) : (
        <>...Loading</>
      )}
      <RandomButton type="button" onClick={onButtonClick}>
        Random Planet
      </RandomButton>
    </Container>
  );
};

RandomPlanet.displayName = "RandomPlanet";
