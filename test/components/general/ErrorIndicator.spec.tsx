import { render, screen } from "@testing-library/react";
import * as React from "react";
import { ErrorIndicator } from "../../../src/components/general/ErrorIndicator";

describe("ErrorIndicator", () => {
  it("has displayName", () => {
    expect(ErrorIndicator.displayName).toBe("ErrorIndicator");
  });

  it("Has fun text", () => {
    render(<ErrorIndicator />);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(1);
    expect(screen.queryAllByText("something has gone terribly wrong")).toHaveLength(1);
    expect(screen.queryAllByText("(but we already sent droids to fix it)")).toHaveLength(1);
  });
});
