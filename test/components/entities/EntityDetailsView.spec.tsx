import * as React from "react";
import { render, screen } from "@testing-library/react";
import { EntityDetailsView, EntityDetailsViewProps } from "../../../src/components/entities/EntityDetailsView";

describe("EntityDetailsView", () => {
  it("has displayName", () => {
    expect(EntityDetailsView.displayName).toBe("EntityDetailsView");
  });

  it("rendered some details", () => {
    const date = new Date(Date.now());
    const props: EntityDetailsViewProps = {
      details: [
        { label: "TestLabel1", value: "24" },
        { label: "TestLabel2", value: "TestValue2" },
        { label: "TestLabel3", value: "-" },
      ],
      caption: "TestCaption",
      img: "testUrl",
      lastEdited: date
    };
    render(<EntityDetailsView {...props} />);
    expect(screen.queryAllByText("TestCaption")).toHaveLength(1);
    expect(screen.queryAllByText("TestLabel1")).toHaveLength(1);
    expect(screen.queryAllByText("TestLabel2")).toHaveLength(1);
    expect(screen.queryAllByText("TestLabel3")).toHaveLength(1);
    expect(screen.queryAllByText("24")).toHaveLength(1);
    expect(screen.queryAllByText("TestValue2")).toHaveLength(1);
    expect(screen.queryAllByText("-")).toHaveLength(1);
    expect(screen.queryAllByText("Last Edited")).toHaveLength(1);
    expect(screen.queryAllByText(date.toISOString())).toHaveLength(1);
  });
});
