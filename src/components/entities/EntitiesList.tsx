import * as React from "react";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";
import { Link } from "react-router-dom";
import { EntityShort } from "./utils";
import { Paginator } from "../general/Paginator";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%"
});

const List = styled.ul({
  padding: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  listStyle: "none",
  width: "100%"
});

const ListItem = styled.li({
  display: "flex",
  flexDirection: "row",
  fontSize: "0.9rem",
  textAlign: "center",
  fontFamily: "'Open Sans', sans-serif",
  color: rgba("#f1e9e9", 0.459),
  width: "100%"
});

const NameBlock = styled.span({
  display: "flex",
  paddingLeft: 10,
  width: 320,
  margin: 5,
  alignSelf: "center",
  alignContent: "flex-start",
  color: "white"
});

const FilmsBlock = styled.span({
  display: "flex",
  paddingLeft: 10,
  width: "100%",
  alignContent: "flex-start",
  alignSelf: "center"
});

const LinkElement = styled(Link)({
  textDecoration: "none",
  cursor: "pointer",
  width: "100%",
  color: "white",
  ":hover": {
    backgroundColor: "grey",
    color: "white"
  }
});

const EntityLinkElement = styled(LinkElement)({
  borderWidth: 1,
  borderColor: rgba("#f1e9e9", 0.459),
  borderBottomStyle: "groove",
  ":first-of-type": {
    borderTopStyle: "groove"
  }
});

export interface EntitiesListProps {
  currentPage: number;
  next: boolean;
  previous: boolean;
  entityId: string;
  data: EntityShort[];
}

const renderPageLink =
  (entityId: string) =>
  (page: number, text?: string): React.ReactElement =>
    <LinkElement to={`/${entityId}/${page}`}>{text ? text : page}</LinkElement>;

export const EntitiesList: React.FC<EntitiesListProps> = (props: EntitiesListProps) => {
  const { entityId, data, ...pagination } = props;

  return (
    <Container>
      <List>
        {data.map((planet) => (
          <EntityLinkElement to={`/${entityId}/details/${planet.id}`}>
            <ListItem>
              <NameBlock>{planet.name}</NameBlock>
              <FilmsBlock>{planet.films.join(", ")}</FilmsBlock>
            </ListItem>
          </EntityLinkElement>
        ))}
      </List>
      <Paginator {...pagination} renderLink={renderPageLink(entityId)} min={1} />
    </Container>
  );
};

EntitiesList.displayName = "EntitiesList";
