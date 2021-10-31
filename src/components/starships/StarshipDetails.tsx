import * as React from "react";
import styled from "@emotion/styled";
import { Starship } from "../../models/entities";

export interface StarshipDetailsProps {
  starship: Starship
}

const Container = styled.div({
  display: "flex"
})

export const StarshipDetails: React.FC<StarshipDetailsProps> = (props: StarshipDetailsProps) => {
  return <Container>{props.starship.name}</Container>;
};

StarshipDetails.displayName = "StarshipDetails";
