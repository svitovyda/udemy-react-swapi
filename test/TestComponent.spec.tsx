
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { TestComponent } from "../src/TestComponent";

describe("TestComponent", () => {
  it("has displayName", () => {
    expect(TestComponent.displayName).toBe("TestComponent");
  });

  it("rendered with a `text` prop should paste it into the text", () => {
    render(<TestComponent text="Test Text" />);
    expect(screen.queryAllByText("Test Text")).toHaveLength(1);
    expect(screen.queryAllByText("Hallo World")).toHaveLength(0);
  });
});
