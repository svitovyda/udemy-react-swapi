import { render, screen } from "@testing-library/react";
import * as React from "react";
import { StarshipDetails } from "../../../src/components/starships/StarshipDetails";
import { starshipsPage1 } from "../../__mock__/results";

describe("StarshipDetails", () => {
  it("has displayName", () => {
    expect(StarshipDetails.displayName).toBe("StarshipDetails");
  });

  it("rendered person with a name", () => {
    render(<StarshipDetails starship={starshipsPage1.results[0]} />);
    expect(screen.queryAllByText(starshipsPage1.results[0].name)).toHaveLength(1);
    expect(screen.queryAllByText("Hallo World")).toHaveLength(0);
  });
});
