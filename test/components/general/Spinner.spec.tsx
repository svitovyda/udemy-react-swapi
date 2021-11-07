import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Spinner } from "../../../src/components/general/Spinner";

describe("Spinner", () => {
  it("has displayName", () => {
    expect(Spinner.displayName).toBe("Spinner");
  });

  it("Has 'Loading' text", () => {
    render(<Spinner />);
    expect(screen.queryAllByText("loading")).toHaveLength(1);
  });
});
