import * as React from "react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import { Search } from "../general/Search";
import { rgba } from "emotion-rgba";

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

const ListElement = styled.li((props: React.DOMAttributes<HTMLLIElement> & { selected: boolean }) => ({
  display: "inline",
  padding: "2px 32px",
  borderWidth: 1,
  borderColor: rgba("#f1e9e9", 0.459),
  borderRightStyle: "groove",
  ":hover": {
    backgroundColor: props.selected ? "unset" : "grey"
  },
  ":first-of-type": {
    borderLeftStyle: "groove"
  }
}));

const LinkElement = styled(Link)((props: React.DOMAttributes<HTMLAnchorElement> & { selected: boolean }) => ({
  fontFamily: "'Open Sans', sans-serif",
  textDecoration: "none",
  userSelect: "none",
  cursor: "pointer",
  color: props.selected ? "gray" : "#f3f0f0",
  ":hover": {
    color: props.selected ? "grey" : "#fff",
    borderBottom: props.selected ? "none" : "1px solid #fff"
  }
}));

export interface HeaderElementProps {
  item: HeaderItem;
  selected: boolean;
}

const HeaderElement: React.FC<HeaderElementProps> = (props: HeaderElementProps) => {
  return (
    <ListElement key={props.item.id} selected={props.selected} >
      <LinkElement selected={props.selected} to={`/${props.item.id}/1`}>
        {props.item.caption}
      </LinkElement>
    </ListElement>
  );
};

export interface HeaderProps {
  items: HeaderItem[];
}

export const Header: React.FC<HeaderProps> = React.memo((props: HeaderProps) => {
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
          {props.items.map((item) => (
            <HeaderElement item={item} key={item.id} selected={location.pathname.includes(item.id)} />
          ))}
        </List>
      </ListContainer>
    </Nav>
  );
});

Header.displayName = "Header";
