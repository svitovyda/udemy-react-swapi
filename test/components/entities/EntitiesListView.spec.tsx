import * as React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { EntitiesListView, EntitiesListViewProps } from "../../../src/components/entities/EntitiesListView";

describe("EntityDetailsView", () => {
  it("has displayName", () => {
    expect(EntitiesListView.displayName).toBe("EntitiesListView");
  });

  it("render some page", () => {
    const props: EntitiesListViewProps = {
      data: {
        next: true,
        page: 3,
        previous: true,
        result: [
          {
            id: "1",
            films: ["Film1", "Film2", "Film3"],
            name: "TestEntity1"
          },
          {
            id: "2",
            films: ["Film4"],
            name: "TestEntity2"
          },
          {
            id: "3",
            films: ["Film5"],
            name: "TestEntity3"
          }
        ]
      },
      entityUrlId: "testId"
    };

    render(<BrowserRouter><EntitiesListView {...props} /></BrowserRouter>);
    expect(screen.queryAllByText("Film1, Film2, Film3")).toHaveLength(1);
    expect(screen.queryAllByText("Film4")).toHaveLength(1);
    expect(screen.queryAllByText("Film5")).toHaveLength(1);
    expect(screen.queryAllByText("TestEntity1")).toHaveLength(1);
    expect(screen.queryAllByText("TestEntity2")).toHaveLength(1);
    expect(screen.queryAllByText("TestEntity3")).toHaveLength(1);
    expect(screen.queryAllByText("3")).toHaveLength(1);
    expect(screen.queryAllByText("<")).toHaveLength(1);
    expect(screen.queryAllByText(">")).toHaveLength(1);
  });
});
