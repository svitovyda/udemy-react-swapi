import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "../../../src/components/main/Header";

describe("Header", () => {
  it("has displayName", () => {
    expect(Header.displayName).toBe("Header");
  });

  it("rendered header with one item", () => {
    render(
      <Router>
        <Header items={[{ caption: "Test Text", id: "testId" }]} />
      </Router>
    );
    expect(screen.queryByText("Test Text")).toBeInTheDocument();
    expect(screen.queryByText("Hallo World")).not.toBeInTheDocument();
  });
});
