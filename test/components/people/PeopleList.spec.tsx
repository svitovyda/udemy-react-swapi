import { render, screen } from "@testing-library/react";
import * as React from "react";
import { PeopleList } from "../../../src/components/people/PeopleList";

describe("PeopleList", () => {
  it("has displayName", () => {
    expect(PeopleList.displayName).toBe("PeopleList");
  });

  it("rendered person with a name", () => {
    render(<PeopleList page={1} />);
    expect(screen.queryAllByText("1")).toHaveLength(1);
    expect(screen.queryAllByText("Hallo World")).toHaveLength(0);
  });
});
