import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Paginator } from "../../../src/components/general/Paginator";

const renderLink = (page: number, text?: string): React.ReactElement => <div>link{text ? text : page}link</div>;

describe("Paginator", () => {
  it("has displayName", () => {
    expect(Paginator.displayName).toBe("Paginator");
  });

  it("renders min and max big range", () => {
    render(<Paginator currentPage={8} min={-1} max={23} renderLink={renderLink} next previous />);
    expect(screen.queryByText("8")).toBeInTheDocument();
    expect(screen.queryByText("link-1link")).toBeInTheDocument();
    expect(screen.queryByText("link23link")).toBeInTheDocument();
    expect(screen.queryAllByText("...")).toHaveLength(2);
    expect(screen.queryByText("link<link")).toBeInTheDocument();
    expect(screen.queryByText("link>link")).toBeInTheDocument();
  });

  it("renders correctly min and max big range when currentPage=min", () => {
    render(<Paginator currentPage={-1} min={-1} max={23} renderLink={renderLink} next previous />);
    expect(screen.queryByText("-1")).toBeInTheDocument();
    expect(screen.queryByText("link-1link")).not.toBeInTheDocument();
    expect(screen.queryByText("link23link")).toBeInTheDocument();
    expect(screen.queryByText("...")).toBeInTheDocument();
    expect(screen.queryByText("link<link")).not.toBeInTheDocument();
    expect(screen.queryByText("link>link")).toBeInTheDocument();
  });

  it("renders correctly min and max big range when currentPage=min+1", () => {
    render(<Paginator currentPage={0} min={-1} max={23} renderLink={renderLink} next previous />);
    expect(screen.queryByText("0")).toBeInTheDocument();
    expect(screen.queryByText("link-1link")).toBeInTheDocument();
    expect(screen.queryByText("link23link")).toBeInTheDocument();
    expect(screen.queryByText("...")).toBeInTheDocument();
    expect(screen.queryByText("link<link")).not.toBeInTheDocument();
    expect(screen.queryByText("link>link")).toBeInTheDocument();
  });

  it("renders correctly min and max big range when currentPage=max", () => {
    render(<Paginator currentPage={23} min={-1} max={23} renderLink={renderLink} next previous />);
    expect(screen.queryByText("23")).toBeInTheDocument();
    expect(screen.queryByText("link-1link")).toBeInTheDocument();
    expect(screen.queryByText("link23link")).not.toBeInTheDocument();
    expect(screen.queryByText("...")).toBeInTheDocument();
    expect(screen.queryByText("link<link")).toBeInTheDocument();
    expect(screen.queryByText("link>link")).not.toBeInTheDocument();
  });

  it("renders correctly min and max big range when currentPage=max-1", () => {
    render(<Paginator currentPage={22} min={-1} max={23} renderLink={renderLink} next previous />);
    expect(screen.queryByText("22")).toBeInTheDocument();
    expect(screen.queryByText("link-1link")).toBeInTheDocument();
    expect(screen.queryByText("link23link")).toBeInTheDocument();
    expect(screen.queryByText("...")).toBeInTheDocument();
    expect(screen.queryByText("link<link")).toBeInTheDocument();
    expect(screen.queryByText("link>link")).not.toBeInTheDocument();
  });

  it("renders min and max no range", () => {
    render(<Paginator currentPage={2} min={1} max={3} renderLink={renderLink} next previous />);
    expect(screen.queryByText("2")).toBeInTheDocument();
    expect(screen.queryByText("link1link")).toBeInTheDocument();
    expect(screen.queryByText("link3link")).toBeInTheDocument();
    expect(screen.queryByText("...")).not.toBeInTheDocument();
    expect(screen.queryByText("link<link")).not.toBeInTheDocument();
    expect(screen.queryByText("link>link")).not.toBeInTheDocument();
  });

  it("renders no min nor max", () => {
    render(<Paginator currentPage={2} renderLink={renderLink} next previous />);
    expect(screen.queryByText("2")).toBeInTheDocument();
    expect(screen.queryByText("link1link")).not.toBeInTheDocument();
    expect(screen.queryByText("link3link")).not.toBeInTheDocument();
    expect(screen.queryByText("...")).not.toBeInTheDocument();
    expect(screen.queryByText("link<link")).toBeInTheDocument();
    expect(screen.queryByText("link>link")).toBeInTheDocument();
  });

  it("renders only min big range", () => {
    render(<Paginator currentPage={8} min={-1} renderLink={renderLink} next previous />);
    expect(screen.queryByText("8")).toBeInTheDocument();
    expect(screen.queryByText("link-1link")).toBeInTheDocument();
    expect(screen.queryByText("...")).toBeInTheDocument();
    expect(screen.queryByText("link<link")).toBeInTheDocument();
    expect(screen.queryByText("link>link")).toBeInTheDocument();
  });

  it("renders only max big range", () => {
    render(<Paginator currentPage={8} max={23} renderLink={renderLink} next previous />);
    expect(screen.queryByText("8")).toBeInTheDocument();
    expect(screen.queryByText("link1link")).not.toBeInTheDocument();
    expect(screen.queryByText("link-1link")).not.toBeInTheDocument();
    expect(screen.queryByText("link0link")).not.toBeInTheDocument();
    expect(screen.queryByText("link23link")).toBeInTheDocument();
    expect(screen.queryByText("...")).toBeInTheDocument();
    expect(screen.queryByText("link<link")).toBeInTheDocument();
    expect(screen.queryByText("link>link")).toBeInTheDocument();
  });
});
