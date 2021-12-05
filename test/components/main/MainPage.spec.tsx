import { render, screen } from "@testing-library/react";
import * as React from "react";
import { MainPage } from "../../../src/components/main/MainPage";

describe("MainPage", () => {
  it("has displayName", () => {
    expect(MainPage.displayName).toBe("MainPage");
  });

  it("renders loader at the beginning", () => {
    render(<MainPage />);
    expect(screen.queryAllByText("loading")).toHaveLength(1);
  })
});
