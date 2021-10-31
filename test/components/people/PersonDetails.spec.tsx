import { render, screen } from "@testing-library/react";
import * as React from "react";
import { PersonDetails } from "../../../src/components/people/PersonDetails";
import { peoplePage1 } from "../../__mock__/results";

describe("PersonDetails", () => {
  it("has displayName", () => {
    expect(PersonDetails.displayName).toBe("PersonDetails");
  });

  it("rendered person with a name", () => {
    render(<PersonDetails person={peoplePage1.results[0]} />);
    expect(screen.queryAllByText(peoplePage1.results[0].name)).toHaveLength(1);
    expect(screen.queryAllByText("Hallo World")).toHaveLength(0);
  });
});
