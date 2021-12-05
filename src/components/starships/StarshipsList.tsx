import * as React from "react";
import { WithDataListProps } from "../entities/utils";
import { withData } from "../entities/WithData";
import { EntitiesListView } from "../entities/EntitiesListView";
import { loadPageController } from "../entities/hooks";

const Starships: React.FC<WithDataListProps> = (props: WithDataListProps) => {
  const { data, dataProvider } = props;

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
