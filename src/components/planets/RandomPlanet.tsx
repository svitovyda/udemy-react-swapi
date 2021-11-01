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
  width: 150,
  height: 150,
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
  display: "flex",
  fontSize: "1.1rem",
  textAlign: "start",
  fontFamily: "'Open Sans', sans-serif",
  margin: "2",
  color: rgba("#f1e9e9", 0.459),
  textTransform: "uppercase"
});

const List = styled.ul({
  padding: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  listStyle: "none"
});

const ListItem = styled.li({
  display: "flex",
  flexDirection: "row",
  fontSize: "0.9rem",
  textAlign: "center",
  fontFamily: "'Open Sans', sans-serif",
  margin: "10 auto",
  color: rgba("#f1e9e9", 0.459)
});

const InfoBlock = styled.span({
  display: "flex",
  paddingLeft: 10,
  width: 120,
  alignContent: "flex-start"
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

const displayNumber = (num: number | undefined, stringOnZero?: string): string | number => {
  if (Number.isNaN(num)) return "Unknown";
  if (num === undefined) return "Not provided";
  if (num === 0 && stringOnZero !== undefined) return stringOnZero;
  return num
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
            <List>
              <ListItem>
                <InfoBlock>Population</InfoBlock>
                <InfoBlock>{displayNumber(props.planet.population, "Unpopulated")}</InfoBlock>
              </ListItem>
              <ListItem>
                <InfoBlock>Rotation Period</InfoBlock>
                <InfoBlock>{displayNumber(props.planet.rotationPeriod, "Unknown")}</InfoBlock>
              </ListItem>
              <ListItem>
                <InfoBlock>Diameter</InfoBlock>
                <InfoBlock>{displayNumber(props.planet.diameter, "Unknown")}</InfoBlock>
              </ListItem>
            </List>
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
