import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { WithError } from "../../../src/components/general/WithError";

describe("WithError", () => {
  it("has displayName", () => {
    expect(WithError.displayName).toBe("WithError");
  });

  it("Shows fun error text, not error message", () => {
    render(<WithError error={new Error("Ups")} />);
    expect(screen.queryByText("BOOM!")).toBeInTheDocument();
    expect(screen.queryByText("Ups")).not.toBeInTheDocument();

    render(<WithError error="Ups" />);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(2);
    expect(screen.queryByText("Ups")).not.toBeInTheDocument();

    render(<WithError error />);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(3);
    expect(screen.queryByText("Ups")).not.toBeInTheDocument();
  });

  it("Shows no error indicator if no error, no children", () => {
    render(<WithError />);
    expect(screen.queryByText("BOOM!")).not.toBeInTheDocument();

    render(<WithError error={undefined} />);
    expect(screen.queryByText("BOOM!")).not.toBeInTheDocument();

    render(<WithError error={false} />);
    expect(screen.queryByText("BOOM!")).not.toBeInTheDocument();

    render(<WithError error="" />);
    expect(screen.queryByText("BOOM!")).not.toBeInTheDocument();
  });

  it("Shows content if no error", () => {
    render(
      <WithError>
        <div>Content</div>
        <div>Info</div>
      </WithError>
    );
    expect(screen.queryByText("BOOM!")).not.toBeInTheDocument();
    expect(screen.queryByText("Content")).toBeInTheDocument();
    expect(screen.queryByText("Info")).toBeInTheDocument();

    render(
      <WithError error={false}>
        <div>Content</div>
        <div>Info</div>
      </WithError>
    );
    expect(screen.queryByText("BOOM!")).not.toBeInTheDocument();
    expect(screen.queryAllByText("Content")).toHaveLength(2);
    expect(screen.queryAllByText("Info")).toHaveLength(2);

    render(
      <WithError error="">
        <div>Content</div>
        <div>Info</div>
      </WithError>
    );
    expect(screen.queryByText("BOOM!")).not.toBeInTheDocument();
    expect(screen.queryAllByText("Content")).toHaveLength(3);
    expect(screen.queryAllByText("Info")).toHaveLength(3);
  });

  it("Shows no content if error", () => {
    render(
      <WithError error={new Error("Ups")}>
        <div>Content</div>
        <div>Info</div>
      </WithError>
    );
    expect(screen.queryByText("BOOM!")).toBeInTheDocument();
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
    expect(screen.queryByText("Info")).not.toBeInTheDocument();

    render(
      <WithError error="Ups">
        <div>Content</div>
        <div>Info</div>
      </WithError>
    );
    expect(screen.queryAllByText("BOOM!")).toHaveLength(2);
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
    expect(screen.queryByText("Info")).not.toBeInTheDocument();

    render(
      <WithError error>
        <div>Content</div>
        <div>Info</div>
      </WithError>
    );
    expect(screen.queryAllByText("BOOM!")).toHaveLength(3);
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
    expect(screen.queryByText("Info")).not.toBeInTheDocument();
  });
});
