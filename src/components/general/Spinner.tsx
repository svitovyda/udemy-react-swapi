import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import React from "react";

const rotateRing = keyframes({
  "0%": {
    transform: "rotate(0)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});

const rotateInner = keyframes({
  "0%": {
    transform: "rotate(0)"
  },
  "100%": {
    transform: "rotate(-360deg)"
  }
});

const textLoading = keyframes({
  "0%": { opacity: 0 },
  "20%": { opacity: 0 },
  "50%": { opacity: 1 },
  "100%": { opacity: 0 }
});

const Container = styled.div({
  height: 100,
  width: 100,
  margin: "5px auto"
});

const Ring = styled.div({
  position: "relative",
  top: 0,
  left: 0,
  height: 100,
  width: 100,
  borderRadius: "100%",
  border: "3px solid transparent",
  borderColor: "transparent grey transparent grey",
  animation: `${rotateRing} 3s linear 0s infinite normal`,
  transformOrigin: "50% 50%"
});

const RingInner = styled.div({
  position: "relative",
  top: -94,
  left: 6,
  width: 88,
  height: 88,
  borderRadius: "100%",
  border: "2px solid transparent",
  borderColor: "transparent grey transparent grey",
  animation: `${rotateInner} 1.5s linear 0s infinite normal`,
  transformOrigin: "50% 50%"
});

const TextContainer = styled.div({
  position: "relative",
  top: -145,
  left: 0,
  width: 100,
  userSelect: "none",
  animation: `${textLoading} 3s linear 0s infinite normal`,
  color: "grey",
  fontFamily: "'Open Sans', sans-serif",
  fontSize: 12,
  opacity: 0,
  textAlign: "center",
  textTransform: "uppercase"
});

export const Spinner: React.FC = React.memo(() => {
  return (
    <Container>
      <Ring />
      <RingInner/>
      <TextContainer>loading</TextContainer>
    </Container>
  );
});

Spinner.displayName = "Spinner";
