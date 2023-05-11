import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { EntitiesListView } from "../../../src/components/entities/EntitiesListView";
import type { EntitiesListViewProperties } from "../../../src/components/entities/EntitiesListView";

describe("EntityDetailsView", () => {
  it("has displayName", () => {
    expect(EntitiesListView.displayName).toBe("EntitiesListView");
  });

  it("render some page", () => {
    const properties: EntitiesListViewProperties = {
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

    render(
      <BrowserRouter>
        <EntitiesListView {...properties} />
      </BrowserRouter>
    );
    expect(screen.queryByText("Film1, Film2, Film3")).toBeInTheDocument();
    expect(screen.queryByText("Film4")).toBeInTheDocument();
    expect(screen.queryByText("Film5")).toBeInTheDocument();
    expect(screen.queryByText("TestEntity1")).toBeInTheDocument();
    expect(screen.queryByText("TestEntity2")).toBeInTheDocument();
    expect(screen.queryByText("TestEntity3")).toBeInTheDocument();
    expect(screen.queryByText("3")).toBeInTheDocument();
    expect(screen.queryByText("<")).toBeInTheDocument();
    expect(screen.queryByText(">")).toBeInTheDocument();
  });
});
