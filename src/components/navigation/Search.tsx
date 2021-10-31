import * as React from "react";
import styled from "@emotion/styled";

const Container = styled.div({
  display: "flex",
  border: 0,
  borderRadius: 4,
  flexWrap: "wrap",
  alignSelf: "center",
  backgroundColor: "#343434",
  boxShadow: "none",
  position: "relative",
  width: 200,
  opacity: 0.9,
  height: 30,
  transition: "opacity 350ms",
  zIndex: 1
});

const Input = styled.input({
  display: "flex",
  border: 0,
  borderRadius: 4,
  backgroundColor: "transparent",
  visibility: "visible",
  color: "#fff",
  fontSize: "medium",
  fontWeight: 700,
  fontFamily: "'Open Sans', sans-serif",
  width: "80%",
  height: "100%",
  ":focus": {
    outline: "none",
    backgroundColor: "#585656",
    height: "95%"
  }
});

const Submit = styled.input({
  display: "flex",
  border: 0,
  borderRadius: 4,
  backgroundColor: "transparent",
  visibility: "visible",
  color: "#fff",

  padding: "initial",
  backgroundRepeat: "no-repeat",
  // backgroundImage: url("https://static-mh.content.disney.io/starwars/assets/navigation/icon_search-957a123fdb62.svg"),
  backgroundSize: "60% 60%",
  backgroundPosition: "center",
  width: "20%",
  height: "100%",
  cursor: "pointer",
  ":focus": {
    outline: "none",
    backgroundColor: "#585656"
  }
});

export const Search: React.FC = () => {

  return (
    <Container>
      <form>
        <Input type="text" />
        <Submit type="submit" value="" />
      </form>
    </Container>
  );
};

Search.displayName = "Search";
