import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { WithLoader } from "../../../src/components/general/WithLoader";

describe("WithLoader", () => {
  it("has displayName", () => {
    expect(WithLoader.displayName).toBe("WithLoader");
  });

  it("Shows loader if isLoading, no children", () => {
    render(<WithLoader loading />);
    expect(screen.queryByText("loading")).toBeInTheDocument();
  });

  it("Shows no loader if isLoading=false, no children", () => {
    render(<WithLoader loading={false} />);
    expect(screen.queryByText("loading")).not.toBeInTheDocument();
  });

  it("Shows content if isLoading=false", () => {
    render(
      <WithLoader loading={false}>
        <div>Content</div>
        <div>Info</div>
      </WithLoader>
    );
    expect(screen.queryByText("loading")).not.toBeInTheDocument();
    expect(screen.queryByText("Content")).toBeInTheDocument();
    expect(screen.queryByText("Info")).toBeInTheDocument();
  });

  it("Shows no content if isLoading", () => {
    render(
      <WithLoader loading>
        <div>Content</div>
        <div>Info</div>
      </WithLoader>
    );
    expect(screen.queryByText("loading")).toBeInTheDocument();
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
    expect(screen.queryByText("Info")).not.toBeInTheDocument();
  });
});
