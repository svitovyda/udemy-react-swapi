import { render, screen } from "@testing-library/react";
import * as React from "react";
import { StarshipsList } from "../../../src/components/starships/StarshipsList";

describe("StarshipsList", () => {
  it("has displayName", () => {
    expect(StarshipsList.displayName).toBe("StarshipsList");
  });

  it("rendered person with a name", () => {
    render(<StarshipsList page={1} />);
    expect(screen.queryAllByText("1")).toHaveLength(1);
    expect(screen.queryAllByText("Hallo World")).toHaveLength(0);
  });
});
