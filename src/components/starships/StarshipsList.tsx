import * as React from "react";
import styled from "@emotion/styled";

export interface StarshipsListProps {
  page: number;
}

const Container = styled.div({
  display: "flex"
});

export const StarshipsList: React.FC<StarshipsListProps> = (props: StarshipsListProps) => {
  return <Container>{props.page}</Container>;
};

StarshipsList.displayName = "StarshipsList";
