import styled from "@emotion/styled";
import * as React from "react";

const Container = styled.div({
  display: "flex",
  border: 0,
  borderRadius: 4,
  flexWrap: "wrap",
  alignSelf: "flex-start",
  backgroundColor: "#343434",
  boxShadow: "none",
  marginTop: 8,
  marginLeft: 40,
  width: 200,
  opacity: 0.9,
  height: 30,
  transition: "opacity 350ms",
  zIndex: 1
});

const Input = styled.input({
  display: "flex",
  alignSelf: "center",
  border: 0,
  borderRadius: 4,
  backgroundColor: "transparent",
  visibility: "visible",
  color: "#fff",
  fontSize: "medium",
  fontFamily: "'Open Sans', sans-serif",
  width: "180",
  height: 30,
  ":focus": {
    outline: "none"
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

export const Search: React.FC = React.memo(() => {
  return (
    <Container>
      <form>
        <Input type="text" />
        <Submit type="submit" value="" />
      </form>
    </Container>
  );
});

Search.displayName = "Search";
