import * as React from "react";
import { TestComponent } from "./TestComponent";
import { SwapiService } from "./services/SwapiService";

export const App: React.FC<{}> = () => {
  const service = new SwapiService();
  service.getPerson("1").then(res => console.log(res)).catch((err: Error) => console.log(err));
  service.getPlanet("1").then(res => console.log(res)).catch((err: Error) => console.log(err));
  service.getStarship("2").then(res => console.log(res)).catch((err: Error) => console.log(err));
  return (
    <>
      <TestComponent text="Hello World!" />
    </>
  );
};

App.displayName = "App";
