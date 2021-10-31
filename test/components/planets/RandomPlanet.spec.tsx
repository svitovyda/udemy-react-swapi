import { render, screen } from "@testing-library/react";
import * as React from "react";
import { RandomPlanet } from "../../../src/components/planets/RandomPlanet";

describe("RandomPlanet", () => {
  it("has displayName", () => {
    expect(RandomPlanet.displayName).toBe("RandomPlanet");
  });

  it("rendered person with a name", () => {
    render(<RandomPlanet />);
    expect(screen.queryAllByText("Some Random Planet")).toHaveLength(1);
    expect(screen.queryAllByText("Hallo World")).toHaveLength(0);
  });
});
