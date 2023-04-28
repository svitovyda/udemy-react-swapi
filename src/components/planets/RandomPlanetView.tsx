import styled from "@emotion/styled";
import * as React from "react";
import { Planet } from "../../models/entities";
import { EntityDetailsView, EntityDetail } from "../entities/EntityDetailsView";
import { displayNumber } from "../entities/utils";

const Container = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  width: "100%",
  padding: "1rem",
  backgroundColor: "#0a0a0a",
  borderRadius: 10
});

const Button = styled.button({
  padding: "0.5rem 1rem",
  fontSize: "1.25rem",
  borderRadius: "0.3rem",
  display: "inline-block",
  alignSelf: "center",
  fontWeight: 400,
  lineHeight: 1.5,
  textAlign: "center",
  textDecoration: "none",
  verticalAlign: "middle",
  cursor: "pointer",
  userSelect: "none",
  border: "1px solid #e74c3c",
  transition:
    "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
  color: "#fff",
  backgroundColor: "#e74c3c",
  ":hover": {
    color: "white"
  }
});

const PlanetImage = styled.img({
  width: 150,
  height: 150,
  marginRight: "1rem",
  borderRadius: 10,
  objectFit: "cover"
});

export interface RandomPlanetViewProperties {
  planet?: Planet;
  imageUrl?: string;
  btnEnabled: boolean;
  onShowRanomPlanet?: () => void;
}

export const RandomPlanetView: React.FC<RandomPlanetViewProperties> = (properties: RandomPlanetViewProperties) => {
  const { btnEnabled, planet, imageUrl, onShowRanomPlanet } = properties;

  const onButtonClick = React.useCallback(() => {
    if (onShowRanomPlanet) onShowRanomPlanet();
  }, [onShowRanomPlanet]);

  const details: EntityDetail[] = planet
    ? [
        { label: "Population", value: displayNumber(planet.population, "Unpopulated") },
        { label: "Rotation Period", value: displayNumber(planet.rotationPeriod, "Unknown") },
        { label: "Diameter", value: displayNumber(planet.diameter, "Unknown") }
      ]
    : [];

  return (
    <Container>
      {!!planet && (
        <>
          <PlanetImage src={imageUrl} alt={planet.name} />
          <EntityDetailsView caption={planet.name} details={details} />
          <Button type="button" onClick={onButtonClick} disabled={!btnEnabled}>
            Load Random Planet
          </Button>
        </>
      )}
    </Container>
  );
};

RandomPlanetView.displayName = "RandomPlanetView";
