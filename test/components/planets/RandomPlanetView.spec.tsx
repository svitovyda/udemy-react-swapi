import { render, screen } from "@testing-library/react";
import * as React from "react";
import { RandomPlanetView, RandomPlanetViewProps } from "../../../src/components/planets/RandomPlanetView";
import { planetsPage1 } from "../../__mock__/results";

describe("RandomPlanetView", () => {
  it("has displayName", () => {
    expect(RandomPlanetView.displayName).toBe("RandomPlanetView");
  });

  it("rendered a planet", () => {
    const clickMock = jest.fn();

    const props: RandomPlanetViewProps = {
      planet: planetsPage1.results[0],
      imageUrl: "",
      onShowRanomPlanet: clickMock,
      btnEnabled: true
    };

    render(<RandomPlanetView {...props} />);
    expect(screen.queryAllByText(planetsPage1.results[0].name)).toHaveLength(1);
    expect(screen.queryAllByText("200000")).toHaveLength(1);
    expect(screen.queryAllByText("10465")).toHaveLength(1);
    expect(screen.queryAllByText("23")).toHaveLength(1);
    const btn = screen.queryByText("Load Random Planet");
    expect(btn).toBeTruthy();
    btn!.click();
    expect(clickMock).toBeCalled();
  });
  it("renders disabled button", () => {
    const clickMock = jest.fn();

    const props: RandomPlanetViewProps = {
      planet: planetsPage1.results[0],
      imageUrl: "",
      btnEnabled: false,
      onShowRanomPlanet: clickMock
    };

    render(<RandomPlanetView {...props} />);
    const btn = screen.queryByText("Load Random Planet")?.closest('button');
    expect(btn).toBeTruthy();
    expect(btn?.hasAttribute("disabled")).toBeTruthy();
    btn!.click();
    expect(clickMock).not.toBeCalled();
  });
});
