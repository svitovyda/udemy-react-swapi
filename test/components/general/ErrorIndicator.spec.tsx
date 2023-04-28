import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { ErrorIndicator } from "../../../src/components/general/ErrorIndicator";

describe("ErrorIndicator", () => {
  it("has displayName", () => {
    expect(ErrorIndicator.displayName).toBe("ErrorIndicator");
  });

  it("Has fun text", () => {
    render(<ErrorIndicator />);
    expect(screen.queryByText("BOOM!")).toBeInTheDocument();
    expect(screen.queryByText("something has gone terribly wrong")).toBeInTheDocument();
    expect(screen.queryByText("(but we already sent droids to fix it)")).toBeInTheDocument();
  });
});
