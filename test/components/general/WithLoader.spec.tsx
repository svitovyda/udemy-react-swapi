import { render, screen } from "@testing-library/react";
import * as React from "react";
import { WithLoader } from "../../../src/components/general/WithLoader";

describe("WithLoader", () => {
  it("has displayName", () => {
    expect(WithLoader.displayName).toBe("WithLoader");
  });

  it("Shows loader if isLoading, no children", () => {
    render(<WithLoader isLoading />);
    expect(screen.queryAllByText("loading")).toHaveLength(1);
  });

  it("Shows no loader if isLoading=false, no children", () => {
    render(<WithLoader isLoading={false} />);
    expect(screen.queryAllByText("loading")).toHaveLength(0);
  });

  it("Shows content if isLoading=false", () => {
    render(
      <WithLoader isLoading={false}>
        <div>Content</div>
        <div>Info</div>
      </WithLoader>
    );
    expect(screen.queryAllByText("loading")).toHaveLength(0);
    expect(screen.queryAllByText("Content")).toHaveLength(1);
    expect(screen.queryAllByText("Info")).toHaveLength(1);
  });

  it("Shows no content if isLoading", () => {
    render(
      <WithLoader isLoading>
        <div>Content</div>
        <div>Info</div>
      </WithLoader>
    );
    expect(screen.queryAllByText("loading")).toHaveLength(1);
    expect(screen.queryAllByText("Content")).toHaveLength(0);
    expect(screen.queryAllByText("Info")).toHaveLength(0);
  });
});
