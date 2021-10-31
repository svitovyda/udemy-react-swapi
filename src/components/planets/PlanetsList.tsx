import * as React from "react";
import styled from "@emotion/styled";

export interface PlanetsListProps {
  page: number;
}

const Container = styled.div({
  display: "flex"
});

export const PlanetsList: React.FC<PlanetsListProps> = (props: PlanetsListProps) => {
  return <Container>{props.page}</Container>;
};

PlanetsList.displayName = "PlanetsList";
