import * as React from "react";
import { EntitiesListView } from "../entities/EntitiesListView";
import { withData } from "../entities/WithData";
import { loadPageController } from "../entities/hooks";
import type { WithDataListProps as WithDataListProperties } from "../entities/utils";
import { DataProviderContext } from "../main/App";

const Planets: React.FC<WithDataListProperties> = (properties: WithDataListProperties) => {
  const dataProvider = React.useContext(DataProviderContext);
  const { data } = properties;

  loadPageController(dataProvider.getPlanets, properties);

  return <>{!!data && <EntitiesListView data={data} entityUrlId="planets" />}</>;
};
Planets.displayName = "Planets";

export const PlanetsList = withData(Planets);
PlanetsList.displayName = "PlanetsList";
