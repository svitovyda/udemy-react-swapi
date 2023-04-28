import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { MainPage } from "../../../src/components/main/MainPage";

describe("MainPage", () => {
  it("has displayName", () => {
    expect(MainPage.displayName).toBe("MainPage");
  });

  it("renders loader at the beginning", () => {
    render(<MainPage />);
    expect(screen.queryByText("loading")).toBeInTheDocument();
  });
});
