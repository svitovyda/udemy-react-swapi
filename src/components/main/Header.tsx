import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from "../general/Search";

export interface HeaderItem {
  caption: String;
  id: string;
}

const Nav = styled.nav({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "row",
  width: "100%"
});

const StarWarsSearch = styled.div({
  display: "flex",
  alignItems: "center"
});

const LogoContainer = styled.div({
  marginLeft: "0"
});

const Logo = styled.img({
  display: "flex",
  width: 135,
  height: 90,
  borderRadius: 10,
  marginBottom: 10
});

const ListContainer = styled.div({
  display: "flex",
  padding: "4px 15px",
  justifyContent: "space-around",
  marginLeft: "auto"
});

const List = styled.ul({
  display: "flex",
  margin: 0
});

const ListElement = styled.li((properties: React.DOMAttributes<HTMLLIElement> & { selected: boolean }) => ({
  display: "inline",
  padding: "2px 32px",
  borderWidth: 1,
  borderColor: rgba("#f1e9e9", 0.459),
  borderRightStyle: "groove",
  ":hover": {
    backgroundColor: properties.selected ? "unset" : "grey"
  },
  ":first-of-type": {
    borderLeftStyle: "groove"
  }
}));

const LinkElement = styled(Link)((properties: React.DOMAttributes<HTMLAnchorElement> & { selected: boolean }) => ({
  fontFamily: "'Open Sans', sans-serif",
  textDecoration: "none",
  userSelect: "none",
  cursor: "pointer",
  color: properties.selected ? "gray" : "#f3f0f0",
  ":hover": {
    color: properties.selected ? "grey" : "#fff",
    borderBottom: properties.selected ? "none" : "1px solid #fff"
  }
}));

export interface HeaderElementProperties {
  item: HeaderItem;
  selected: boolean;
}

const HeaderElement: React.FC<HeaderElementProperties> = (properties: HeaderElementProperties) => {
  return (
    <ListElement key={properties.item.id} selected={properties.selected}>
      <LinkElement selected={properties.selected} to={`/${properties.item.id}/1`}>
        {properties.item.caption}
      </LinkElement>
    </ListElement>
  );
};

export interface HeaderProperties {
  items: HeaderItem[];
}

export const Header: React.FC<HeaderProperties> = (properties: HeaderProperties) => {
  const location = useLocation();
  return (
    <Nav>
      <StarWarsSearch>
        <LogoContainer>
          <Link to="/">
            <Logo alt="StarDB" width="20%" height="20%" src="/static/logo.png" />
          </Link>
        </LogoContainer>
        <Search />
      </StarWarsSearch>
      <ListContainer>
        <List>
          {properties.items.map((item) => (
            <HeaderElement item={item} key={item.id} selected={location.pathname.includes(item.id)} />
          ))}
        </List>
      </ListContainer>
    </Nav>
  );
};

Header.displayName = "Header";
