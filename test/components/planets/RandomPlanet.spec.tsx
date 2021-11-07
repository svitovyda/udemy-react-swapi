import { render, screen } from "@testing-library/react";
import * as React from "react";
import { RandomPlanet, RandomPlanetProps } from "../../../src/components/planets/RandomPlanet";
import { planetsPage1 } from "../../__mock__/results";

describe("RandomPlanet", () => {
  it("has displayName", () => {
    expect(RandomPlanet.displayName).toBe("RandomPlanet");
  });

  it("rendered a planet", () => {
    const clickMock = jest.fn();

    const props: RandomPlanetProps = {
      planet: planetsPage1.results[0],
      imageUrl: "",
      onShowRanomPlanet: clickMock
    };

    render(<RandomPlanet {...props} />);
    expect(screen.queryAllByText(planetsPage1.results[0].name)).toHaveLength(1);
    expect(screen.queryAllByText("200000")).toHaveLength(1);
    expect(screen.queryAllByText("10465")).toHaveLength(1);
    expect(screen.queryAllByText("23")).toHaveLength(1);
    const btn = screen.queryByText("Load Random Planet");
    expect(btn).toBeTruthy();
    btn!.click();
    expect(clickMock).toBeCalled();
  });
  it("rendered loading status", () => {
    const clickMock = jest.fn();

    render(<RandomPlanet onShowRanomPlanet={clickMock} />);
    expect(screen.queryAllByText("Error")).toHaveLength(1);
    const btn = screen.queryByText("Load Random Planet");
    expect(btn).toBeTruthy();
    btn!.click();
    expect(clickMock).toBeCalled();
  });
});
