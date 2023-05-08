import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { RandomPlanetView, RandomPlanetViewProperties } from "../../../src/components/planets/RandomPlanetView";
import { planetsPage1 } from "../../__mock__/results";

describe("RandomPlanetView", () => {
  it("has displayName", () => {
    expect(RandomPlanetView.displayName).toBe("RandomPlanetView");
  });

  it("rendered a planet", () => {
    const clickMock = jest.fn();

    const properties: RandomPlanetViewProperties = {
      planet: planetsPage1.results[0],
      imageUrl: "",
      onShowRanomPlanet: clickMock,
      btnEnabled: true
    };

    render(<RandomPlanetView {...properties} />);
    expect(screen.queryByText(planetsPage1.results[0]!.name)).toBeInTheDocument();
    expect(screen.queryByText("200000")).toBeInTheDocument();
    expect(screen.queryByText("10465")).toBeInTheDocument();
    expect(screen.queryByText("23")).toBeInTheDocument();
    const button = screen.queryByText("Load Random Planet");
    expect(button).toBeTruthy();
    button!.click();
    expect(clickMock).toBeCalled();
  });
  it("renders disabled button", () => {
    const clickMock = jest.fn();

    const properties: RandomPlanetViewProperties = {
      planet: planetsPage1.results[0],
      imageUrl: "",
      btnEnabled: false,
      onShowRanomPlanet: clickMock
    };

    render(<RandomPlanetView {...properties} />);
    const button = screen.queryByText("Load Random Planet")?.closest("button");
    expect(button).toBeTruthy();
    expect(button?.hasAttribute("disabled")).toBeTruthy();
    button!.click();
    expect(clickMock).not.toBeCalled();
  });
});
