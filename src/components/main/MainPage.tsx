import * as React from "react";
import styled from "@emotion/styled";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  marginTop: "3%"
});

export const MainPage: React.FC = () => {
  return <Container></Container>;
};

MainPage.displayName = "MainPage";
