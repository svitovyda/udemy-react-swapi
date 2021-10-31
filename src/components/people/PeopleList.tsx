import * as React from "react";
import styled from "@emotion/styled";

export interface PeopleListProps {
  page: number;
}

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  flexBasis: "100%",
  margin: "0px 200px",
  backgroundColor: "#0a0a0a"
});

const Page = styled.div({
  display: "flex",
  flexDirection: "column",
  flexGrow: 5
});

export const PeopleList: React.FC<PeopleListProps> = (props: PeopleListProps) => {
  return <Container><Page>{props.page}</Page></Container>;
};

PeopleList.displayName = "PeopleList";
