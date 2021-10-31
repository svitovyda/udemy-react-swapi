import * as React from "react";
import styled from "@emotion/styled";
import { Planet } from "../../models/entities";

export interface PlanetDetailsProps {
  planet: Planet;
}

const Container = styled.div({
  display: "flex"
});

export const PlanetDetails: React.FC<PlanetDetailsProps> = (props: PlanetDetailsProps) => {
  return <Container>{props.planet.name}</Container>;
};

PlanetDetails.displayName = "PlanetDetails";
