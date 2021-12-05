import * as React from "react";
import { WithDataListProps } from "../entities/utils";
import { withData } from "../entities/WithData";
import { EntitiesListView } from "../entities/EntitiesListView";
import { loadPageController } from "../entities/hooks";

const Planets: React.FC<WithDataListProps> = (props: WithDataListProps) => {

  const { data, dataProvider } = props;

  loadPageController(dataProvider.getPlanets, props);

  return (
    <>
      {(!!data && <EntitiesListView data={data} entityUrlId="planets" />)}
    </>
  );
};
Planets.displayName = "Planets";

export const PlanetsList = withData(Planets);
PlanetsList.displayName = "PlanetsList";
