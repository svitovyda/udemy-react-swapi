import * as React from "react";
import { EntitiesListView } from "../entities/EntitiesListView";
import { withData } from "../entities/WithData";
import { loadPageController } from "../entities/hooks";
import { WithDataListProps as WithDataListProperties } from "../entities/utils";
import { DataProviderContext } from "../main/App";

const Starships: React.FC<WithDataListProperties> = (properties: WithDataListProperties) => {
  const dataProvider = React.useContext(DataProviderContext);
  const { data } = properties;

  loadPageController(dataProvider.getStarships, properties);

  return <>{!!data && <EntitiesListView data={data} entityUrlId="starships" />}</>;
};
Starships.displayName = "Starships";

export const StarshipsList = withData(Starships);
StarshipsList.displayName = "StarshipsList";
