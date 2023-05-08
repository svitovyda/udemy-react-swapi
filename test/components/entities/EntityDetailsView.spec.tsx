import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { EntityDetailsView, EntityDetailsViewProperties } from "../../../src/components/entities/EntityDetailsView";

describe("EntityDetailsView", () => {
  it("has displayName", () => {
    expect(EntityDetailsView.displayName).toBe("EntityDetailsView");
  });

  it("rendered some details", () => {
    const date = new Date(Date.now());
    const properties: EntityDetailsViewProperties = {
      details: [
        { label: "TestLabel1", value: "24" },
        { label: "TestLabel2", value: "TestValue2" },
        { label: "TestLabel3", value: "-" }
      ],
      caption: "TestCaption",
      img: "testUrl",
      lastEdited: date
    };
    render(<EntityDetailsView {...properties} />);
    expect(screen.queryByText("TestCaption")).toBeInTheDocument();
    expect(screen.queryByText("TestLabel1")).toBeInTheDocument();
    expect(screen.queryByText("TestLabel2")).toBeInTheDocument();
    expect(screen.queryByText("TestLabel3")).toBeInTheDocument();
    expect(screen.queryByText("24")).toBeInTheDocument();
    expect(screen.queryByText("TestValue2")).toBeInTheDocument();
    expect(screen.queryByText("-")).toBeInTheDocument();
    expect(screen.queryByText("Last Edited")).toBeInTheDocument();
    expect(screen.queryByText(date.toISOString())).toBeInTheDocument();
  });
});
