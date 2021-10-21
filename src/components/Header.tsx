import React, { CSSProperties } from "react";
import styled from "@emotion/styled";

export interface HeaderItem {
  
}
export interface HeaderProps {
  items:
  onSelect();
}

const BaseDiv = styled.div({
  marginTop: ".5rem",
  marginLeft: 10
});

interface ListElementProps {
  selected?: boolean
}
const ListElement = styled.li((props: ListElementProps) => ({
  listStyle: "none",
  userSelect: "none",
  margin: 0,
  padding: ".5rem 1rem",
  borderRadius: 3,
  color: props.color ?? "white",

  ":hover": {
    backgroundColor: "#444"
  }
}));

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <BaseDiv>
      <ListElement selected>People</ListElement>
      <ListElement>Planets</ListElement>
      <ListElement>Starships</ListElement>
    </BaseDiv>
  );
};

Header.displayName = "Header";
