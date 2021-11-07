import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Paginator } from "../../../src/components/general/Paginator";

const renderLink = (page: number, text?: string): React.ReactElement => <div>link{text ? text : page}link</div>

describe("Paginator", () => {
  it("has displayName", () => {
    expect(Paginator.displayName).toBe("Paginator");
  });

  it("renders min and max big range", () => {
    render(<Paginator currentPage={8} min={-1} max={23} renderLink={renderLink} next previous />);
    expect(screen.queryAllByText("8")).toHaveLength(1);
    expect(screen.queryAllByText("link-1link")).toHaveLength(1);
    expect(screen.queryAllByText("link23link")).toHaveLength(1);
    expect(screen.queryAllByText("...")).toHaveLength(2);
    expect(screen.queryAllByText("link<link")).toHaveLength(1);
    expect(screen.queryAllByText("link>link")).toHaveLength(1);
  });

  it("renders correctly min and max big range when currentPage=min", () => {
    render(<Paginator currentPage={-1} min={-1} max={23} renderLink={renderLink} next previous />);
    expect(screen.queryAllByText("-1")).toHaveLength(1);
    expect(screen.queryAllByText("link-1link")).toHaveLength(0);
    expect(screen.queryAllByText("link23link")).toHaveLength(1);
    expect(screen.queryAllByText("...")).toHaveLength(1);
    expect(screen.queryAllByText("link<link")).toHaveLength(0);
    expect(screen.queryAllByText("link>link")).toHaveLength(1);
  });

  it("renders correctly min and max big range when currentPage=min+1", () => {
    render(<Paginator currentPage={0} min={-1} max={23} renderLink={renderLink} next previous />);
    expect(screen.queryAllByText("0")).toHaveLength(1);
    expect(screen.queryAllByText("link-1link")).toHaveLength(1);
    expect(screen.queryAllByText("link23link")).toHaveLength(1);
    expect(screen.queryAllByText("...")).toHaveLength(1);
    expect(screen.queryAllByText("link<link")).toHaveLength(0);
    expect(screen.queryAllByText("link>link")).toHaveLength(1);
  });

  it("renders correctly min and max big range when currentPage=max", () => {
    render(<Paginator currentPage={23} min={-1} max={23} renderLink={renderLink} next previous />);
    expect(screen.queryAllByText("23")).toHaveLength(1);
    expect(screen.queryAllByText("link-1link")).toHaveLength(1);
    expect(screen.queryAllByText("link23link")).toHaveLength(0);
    expect(screen.queryAllByText("...")).toHaveLength(1);
    expect(screen.queryAllByText("link<link")).toHaveLength(1);
    expect(screen.queryAllByText("link>link")).toHaveLength(0);
  });

  it("renders correctly min and max big range when currentPage=max-1", () => {
    render(<Paginator currentPage={22} min={-1} max={23} renderLink={renderLink} next previous />);
    expect(screen.queryAllByText("22")).toHaveLength(1);
    expect(screen.queryAllByText("link-1link")).toHaveLength(1);
    expect(screen.queryAllByText("link23link")).toHaveLength(1);
    expect(screen.queryAllByText("...")).toHaveLength(1);
    expect(screen.queryAllByText("link<link")).toHaveLength(1);
    expect(screen.queryAllByText("link>link")).toHaveLength(0);
  });

  it("renders min and max no range", () => {
    render(<Paginator currentPage={2} min={1} max={3} renderLink={renderLink} next previous />);
    expect(screen.queryAllByText("2")).toHaveLength(1);
    expect(screen.queryAllByText("link1link")).toHaveLength(1);
    expect(screen.queryAllByText("link3link")).toHaveLength(1);
    expect(screen.queryAllByText("...")).toHaveLength(0);
    expect(screen.queryAllByText("link<link")).toHaveLength(0);
    expect(screen.queryAllByText("link>link")).toHaveLength(0);
  });

  it("renders no min nor max", () => {
    render(<Paginator currentPage={2} renderLink={renderLink} next previous />);
    expect(screen.queryAllByText("2")).toHaveLength(1);
    expect(screen.queryAllByText("link1link")).toHaveLength(0);
    expect(screen.queryAllByText("link3link")).toHaveLength(0);
    expect(screen.queryAllByText("...")).toHaveLength(0);
    expect(screen.queryAllByText("link<link")).toHaveLength(1);
    expect(screen.queryAllByText("link>link")).toHaveLength(1);
  });

  it("renders only min big range", () => {
    render(<Paginator currentPage={8} min={-1} renderLink={renderLink} next previous />);
    expect(screen.queryAllByText("8")).toHaveLength(1);
    expect(screen.queryAllByText("link-1link")).toHaveLength(1);
    expect(screen.queryAllByText("...")).toHaveLength(1);
    expect(screen.queryAllByText("link<link")).toHaveLength(1);
    expect(screen.queryAllByText("link>link")).toHaveLength(1);
  });

  it("renders only max big range", () => {
    render(<Paginator currentPage={8} max={23} renderLink={renderLink} next previous />);
    expect(screen.queryAllByText("8")).toHaveLength(1);
    expect(screen.queryAllByText("link1link")).toHaveLength(0);
    expect(screen.queryAllByText("link-1link")).toHaveLength(0);
    expect(screen.queryAllByText("link0link")).toHaveLength(0);
    expect(screen.queryAllByText("link23link")).toHaveLength(1);
    expect(screen.queryAllByText("...")).toHaveLength(1);
    expect(screen.queryAllByText("link<link")).toHaveLength(1);
    expect(screen.queryAllByText("link>link")).toHaveLength(1);
  });
});
