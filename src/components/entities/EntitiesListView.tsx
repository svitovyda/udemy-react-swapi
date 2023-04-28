import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";
import * as React from "react";
import { Link } from "react-router-dom";
import { ShortPage } from "../../services/DataProvider";
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
  fontFamily: "'Open Sans', sans-serif",
  color: rgba("#f1e9e9", 0.459),
  width: "100%"
});

const NameBlock = styled.span({
  display: "flex",
  paddingLeft: 10,
  width: 320,
  margin: 5,
  alignItems: "flex-start",
  alignSelf: "center",
  alignContent: "flex-start",
  color: "white"
});

const FilmsBlock = styled.span({
  display: "flex",
  paddingLeft: 10,
  width: "100%",
  alignItems: "flex-start",
  alignSelf: "center",
  alignContent: "flex-start"
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

export interface EntitiesListViewProperties {
  entityUrlId: string;
  data: ShortPage;
}

const renderPageLink =
  (entityId: string) =>
  // eslint-disable-next-line react/display-name
  (page: number, text?: string): React.ReactElement =>
    <LinkElement to={`/${entityId}/${page}`}>{text ? text : page}</LinkElement>;

export const EntitiesListView: React.FC<EntitiesListViewProperties> = (properties: EntitiesListViewProperties) => {
  const { entityUrlId: entityId, data } = properties;

  return (
    <Container>
      <List>
        {data.result.map((item) => (
          <EntityLinkElement to={`/${entityId}/details/${item.id}`} key={`${entityId}-${item.id}`}>
            <ListItem>
              <NameBlock>{item.name}</NameBlock>
              <FilmsBlock>{item.films.join(", ")}</FilmsBlock>
            </ListItem>
          </EntityLinkElement>
        ))}
      </List>
      <Paginator
        renderLink={renderPageLink(entityId)}
        min={1}
        currentPage={data.page}
        next={data.next}
        previous={data.previous}
      />
    </Container>
  );
};

EntitiesListView.displayName = "EntitiesListView";
