import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { WithLoaderAndError } from "../../../src/components/general/WithLoaderAndError";

describe("WithLoaderAndError", () => {
  it("has displayName", () => {
    expect(WithLoaderAndError.displayName).toBe("WithLoaderAndError");
  });

  it("Shows error if error is set, no children, not loading", () => {
    render(<WithLoaderAndError error />);
    expect(screen.queryByText("BOOM!")).toBeInTheDocument();
  });
  it("Shows loader if loading, no children, no error", () => {
    render(<WithLoaderAndError loading />);
    expect(screen.queryByText("loading")).toBeInTheDocument();
  });

  it("Shows error if error and loading are set, no children", () => {
    render(<WithLoaderAndError error loading />);
    expect(screen.queryByText("BOOM!")).toBeInTheDocument();
    expect(screen.queryByText("loading")).not.toBeInTheDocument();
  });

  it("Shows no loader no error if loading=false, no children", () => {
    render(<WithLoaderAndError />);
    expect(screen.queryByText("loading")).not.toBeInTheDocument();
    expect(screen.queryByText("BOOM!")).not.toBeInTheDocument();
  });

  it("Shows content if no error no loading", () => {
    render(
      <WithLoaderAndError>
        <div>Content</div>
        <div>Info</div>
      </WithLoaderAndError>
    );
    expect(screen.queryByText("loading")).not.toBeInTheDocument();
    expect(screen.queryByText("BOOM!")).not.toBeInTheDocument();
    expect(screen.queryByText("Content")).toBeInTheDocument();
    expect(screen.queryByText("Info")).toBeInTheDocument();
  });

  it("Shows no content if loading", () => {
    render(
      <WithLoaderAndError loading>
        <div>Content</div>
        <div>Info</div>
      </WithLoaderAndError>
    );
    expect(screen.queryByText("loading")).toBeInTheDocument();
    expect(screen.queryByText("BOOM!")).not.toBeInTheDocument();
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
    expect(screen.queryByText("Info")).not.toBeInTheDocument();
  });

  it("Shows no content if error", () => {
    render(
      <WithLoaderAndError error>
        <div>Content</div>
        <div>Info</div>
      </WithLoaderAndError>
    );
    expect(screen.queryByText("loading")).not.toBeInTheDocument();
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
    expect(screen.queryByText("Info")).not.toBeInTheDocument();
    expect(screen.queryByText("BOOM!")).toBeInTheDocument();

    render(
      <WithLoaderAndError loading error>
        <div>Content</div>
        <div>Info</div>
      </WithLoaderAndError>
    );
    expect(screen.queryByText("loading")).not.toBeInTheDocument();
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
    expect(screen.queryByText("Info")).not.toBeInTheDocument();
    expect(screen.queryAllByText("BOOM!")).toHaveLength(2);
  });
});
