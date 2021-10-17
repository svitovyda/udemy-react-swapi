import React, { CSSProperties } from "react";
import styled from "@emotion/styled";

export interface TestComponentProps {
  text: string;
}

const BaseText = styled.p((props: CSSProperties) => ({
  whiteSpace: "pre-wrap",
  userSelect: "none",
  margin: 0,
  color: props.color ?? "white",
  fontSize: props.fontSize ?? 30
}));

export const TestComponent: React.FC<TestComponentProps> = (props: TestComponentProps) => {
  return <BaseText color="#aee7f5">{props.text}</BaseText>;
};

TestComponent.displayName = "TestComponent";
