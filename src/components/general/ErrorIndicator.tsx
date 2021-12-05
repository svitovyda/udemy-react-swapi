import React from "react";
import styled from "@emotion/styled";
import Image from "../../assets/deathStar.svg";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  color: "#c78f22"
});

const ImageView = styled(Image)({
  marginBottom: "1rem",
  fill: "#c78f22",
  width: 64,
  height: 64
});

const Boom = styled.span({
  fontSize: "1.7rem"
});

export const ErrorIndicator: React.FC = React.memo(() => {
  return (
    <Container>
      <ImageView />
      <Boom>BOOM!</Boom>
      <span>something has gone terribly wrong</span>
      <span>(but we already sent droids to fix it)</span>
    </Container>
  );
});

ErrorIndicator.displayName = "ErrorIndicator";
