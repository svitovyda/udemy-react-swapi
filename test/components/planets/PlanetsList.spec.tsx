import { render, screen } from "@testing-library/react";
import * as React from "react";
import { PlanetsList } from "../../../src/components/planets/PlanetsList";

describe("PlanetsList", () => {
  it("has displayName", () => {
    expect(PlanetsList.displayName).toBe("PlanetsList");
  });

  it("rendered person with a name", () => {
    render(<PlanetsList page={1} />);
    expect(screen.queryAllByText("1")).toHaveLength(1);
    expect(screen.queryAllByText("Hallo World")).toHaveLength(0);
  });
});
