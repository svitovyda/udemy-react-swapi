import { render, screen } from "@testing-library/react";
import * as React from "react";
import { WithLoaderAndError } from "../../../src/components/general/WithLoaderAndError";

describe("WithLoaderAndError", () => {
  it("has displayName", () => {
    expect(WithLoaderAndError.displayName).toBe("WithLoaderAndError");
  });

  it("Shows error if error is set, no children, not loading", () => {
    render(<WithLoaderAndError error />);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(1);
  });
  it("Shows loader if loading, no children, no error", () => {
    render(<WithLoaderAndError loading />);
    expect(screen.queryAllByText("loading")).toHaveLength(1);
  });

  it("Shows error if error and loading are set, no children", () => {
    render(<WithLoaderAndError error loading />);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(1);
    expect(screen.queryAllByText("loading")).toHaveLength(0);
  });

  it("Shows no loader no error if loading=false, no children", () => {
    render(<WithLoaderAndError />);
    expect(screen.queryAllByText("loading")).toHaveLength(0);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(0);
  });

  it("Shows content if no error no loading", () => {
    render(
      <WithLoaderAndError>
        <div>Content</div>
        <div>Info</div>
      </WithLoaderAndError>
    );
    expect(screen.queryAllByText("loading")).toHaveLength(0);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(0);
    expect(screen.queryAllByText("Content")).toHaveLength(1);
    expect(screen.queryAllByText("Info")).toHaveLength(1);
  });

  it("Shows no content if loading", () => {
    render(
      <WithLoaderAndError loading>
        <div>Content</div>
        <div>Info</div>
      </WithLoaderAndError>
    );
    expect(screen.queryAllByText("loading")).toHaveLength(1);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(0);
    expect(screen.queryAllByText("Content")).toHaveLength(0);
    expect(screen.queryAllByText("Info")).toHaveLength(0);
  });

  it("Shows no content if error", () => {
    render(
      <WithLoaderAndError error>
        <div>Content</div>
        <div>Info</div>
      </WithLoaderAndError>
    );
    expect(screen.queryAllByText("loading")).toHaveLength(0);
    expect(screen.queryAllByText("Content")).toHaveLength(0);
    expect(screen.queryAllByText("Info")).toHaveLength(0);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(1);

    render(
      <WithLoaderAndError loading error>
        <div>Content</div>
        <div>Info</div>
      </WithLoaderAndError>
    );
    expect(screen.queryAllByText("loading")).toHaveLength(0);
    expect(screen.queryAllByText("Content")).toHaveLength(0);
    expect(screen.queryAllByText("Info")).toHaveLength(0);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(2);
  });
});
