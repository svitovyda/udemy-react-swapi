import { render, screen } from "@testing-library/react";
import * as React from "react";
import { LoaderAnimation } from "../../../src/components/general/LoaderAnimation";

describe("LoaderAnimation", () => {
  it("has displayName", () => {
    expect(LoaderAnimation.displayName).toBe("LoaderAnimation");
  });

  it("Has 'Loading' text", () => {
    render(<LoaderAnimation />);
    expect(screen.queryAllByText("loading")).toHaveLength(1);
  });
});
