import * as React from "react";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";
import { Planet } from "../../models/entities";
import { displayNumber } from "../entities/utils";
import { DetailsList, EntityDetail } from "../entities/DetailsList";

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
  width: 150,
  height: 150,
  marginRight: "1rem",
  borderRadius: 10,
  objectFit: "cover"
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
  alignSelf: "flex-end",
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

  const details: EntityDetail[] = props.planet
    ? [
        { label: "Population", value: displayNumber(props.planet.population, "Unpopulated") },
        { label: "Rotation Period", value: displayNumber(props.planet.rotationPeriod, "Unknown") },
        { label: "Diameter", value: displayNumber(props.planet.diameter, "Unknown") }
      ]
    : [];

  return (
    <Container>
      {props.planet ? (
        <>
          <PlanetImage src={props.imageUrl} alt={props.planet.name} />
          <DetailsList caption={props.planet.name} details={details} />
        </>
      ) : (
        <>Error</>
      )}
      <RandomButton type="button" onClick={onButtonClick}>
        Load Random Planet
      </RandomButton>
    </Container>
  );
};

RandomPlanet.displayName = "RandomPlanet";
