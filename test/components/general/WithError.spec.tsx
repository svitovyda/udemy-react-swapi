import { render, screen } from "@testing-library/react";
import * as React from "react";
import { WithError } from "../../../src/components/general/WithError";

describe("WithError", () => {
  it("has displayName", () => {
    expect(WithError.displayName).toBe("WithError");
  });

  it("Shows fun error text, not error message", () => {
    render(<WithError error={new Error("Ups")} />);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(1);
    expect(screen.queryAllByText("Ups")).toHaveLength(0);

    render(<WithError error="Ups" />);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(2);
    expect(screen.queryAllByText("Ups")).toHaveLength(0);

    render(<WithError error />);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(3);
    expect(screen.queryAllByText("Ups")).toHaveLength(0);
  });

  it("Shows no error indicator if no error, no children", () => {
    render(<WithError />);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(0);

    render(<WithError error={undefined} />);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(0);

    render(<WithError error={false} />);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(0);

    render(<WithError error="" />);
    expect(screen.queryAllByText("BOOM!")).toHaveLength(0);
  });

  it("Shows content if no error", () => {
    render(
      <WithError>
        <div>Content</div>
        <div>Info</div>
      </WithError>
    );
    expect(screen.queryAllByText("BOOM!")).toHaveLength(0);
    expect(screen.queryAllByText("Content")).toHaveLength(1);
    expect(screen.queryAllByText("Info")).toHaveLength(1);

    render(
      <WithError error={false}>
        <div>Content</div>
        <div>Info</div>
      </WithError>
    );
    expect(screen.queryAllByText("BOOM!")).toHaveLength(0);
    expect(screen.queryAllByText("Content")).toHaveLength(2);
    expect(screen.queryAllByText("Info")).toHaveLength(2);

    render(
      <WithError error="">
        <div>Content</div>
        <div>Info</div>
      </WithError>
    );
    expect(screen.queryAllByText("BOOM!")).toHaveLength(0);
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
    expect(screen.queryAllByText("BOOM!")).toHaveLength(1);
    expect(screen.queryAllByText("Content")).toHaveLength(0);
    expect(screen.queryAllByText("Info")).toHaveLength(0);

    render(
      <WithError error="Ups">
        <div>Content</div>
        <div>Info</div>
      </WithError>
    );
    expect(screen.queryAllByText("BOOM!")).toHaveLength(2);
    expect(screen.queryAllByText("Content")).toHaveLength(0);
    expect(screen.queryAllByText("Info")).toHaveLength(0);

    render(
      <WithError error>
        <div>Content</div>
        <div>Info</div>
      </WithError>
    );
    expect(screen.queryAllByText("BOOM!")).toHaveLength(3);
    expect(screen.queryAllByText("Content")).toHaveLength(0);
    expect(screen.queryAllByText("Info")).toHaveLength(0);
  });
});
