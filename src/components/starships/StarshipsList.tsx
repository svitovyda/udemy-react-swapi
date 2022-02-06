import * as React from "react";
import { WithDataListProps } from "../entities/utils";
import { withData } from "../entities/WithData";
import { EntitiesListView } from "../entities/EntitiesListView";
import { loadPageController } from "../entities/hooks";
import { DataProviderContext } from "../main/App";

const Starships: React.FC<WithDataListProps> = (props: WithDataListProps) => {
  const dataProvider = React.useContext(DataProviderContext);
  const { data } = props;

  loadPageController(dataProvider.getStarships, props);

  return (
    <>
      {(!!data && <EntitiesListView data={data} entityUrlId="starships" />)}
    </>
  );
};
Starships.displayName = "Starships";

export const StarshipsList = withData(Starships);
StarshipsList.displayName = "StarshipsList";
