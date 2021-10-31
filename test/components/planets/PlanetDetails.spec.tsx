import { render, screen } from "@testing-library/react";
import * as React from "react";
import { PlanetDetails } from "../../../src/components/planets/PlanetDetails";
import { planetsPage1 } from "../../__mock__/results";

describe("PlanetDetails", () => {
  it("has displayName", () => {
    expect(PlanetDetails.displayName).toBe("PlanetDetails");
  });

  it("rendered person with a name", () => {
    render(<PlanetDetails planet={planetsPage1.results[0]} />);
    expect(screen.queryAllByText(planetsPage1.results[0].name)).toHaveLength(1);
    expect(screen.queryAllByText("Hallo World")).toHaveLength(0);
  });
});
