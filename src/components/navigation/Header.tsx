import * as React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Search } from "./Search";
import { rgba } from "emotion-rgba";

export interface HeaderItem {
  caption: String;
  id: string;
}
export interface HeaderProps {
  items: HeaderItem[];
}
export interface HeaderElementProps {
  item: HeaderItem;
  selected: boolean;
  first: boolean;
  onSelect?: (id: string) => void;
}
// nav className=" navigation"
const Nav = styled.nav({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "row",
  width: "100%"
});
// div className="img-star-wars-search"
const StarWarsSearch = styled.div({
  display: "flex",
  alignItems: "center"
});
// div className="img-block"
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
// div className="container-nav-links"
const ListContainer = styled.div({
  display: "flex",
  padding: "4px 15px",
  justifyContent: "space-around",
  marginLeft: "auto"
});
// ul className="nav-links"
const List = styled.ul({
  display: "flex",
  margin: 0
});

const ListElement = styled.li((props: React.DOMAttributes<HTMLLIElement> & { selected: boolean, first: boolean }) => ({
  display: "inline",
  padding: "2px 32px",
  borderWidth: 1,
  borderColor: rgba("#f1e9e9", 0.459),
  borderRightStyle: "groove",
  // fontWeight: 700,
  borderLeftStyle: props.first ? "groove" : "none",
  ":hover": {
    backgroundColor: props.selected ? "unset" : "grey"
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

const HeaderElement: React.FC<HeaderElementProps> = (props: HeaderElementProps) => {
  const onSelect = React.useCallback(() => {
    if (!props.selected && props.onSelect) props.onSelect(props.item.id);
  }, [props.onSelect, props.selected, props.item]);

  return (
    <ListElement key={props.item.id} selected={props.selected} first={props.first}>
      <LinkElement selected={props.selected} onClick={onSelect} to={`/${props.item.id}?page=1`}>
        {props.item.caption}
      </LinkElement>
    </ListElement>
  );
};

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const [selected, setSelected] = React.useState<string | undefined>(undefined);

  const onSelected = React.useCallback((newId: string) => {
    setSelected(newId);
  }, []);

  return (
    <Nav>
      <StarWarsSearch>
        <LogoContainer>
          <Link to="/">
            <Logo alt="StarDB" width="20%" height="20%" src="static/logo.png" />
          </Link>
        </LogoContainer>
        <Search />
      </StarWarsSearch>
      <ListContainer>
        <List>
          {props.items.map((item, i) => (
            <HeaderElement item={item} key={item.id} selected={selected === item.id} onSelect={onSelected} first={i === 0} />
          ))}
        </List>
      </ListContainer>
    </Nav>
  );
};

Header.displayName = "Header";
