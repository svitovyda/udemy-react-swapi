import * as React from "react";
import { EntitiesListView } from "../entities/EntitiesListView";
import { withData } from "../entities/WithData";
import { loadPageController } from "../entities/hooks";
import { WithDataListProps as WithDataListProperties } from "../entities/utils";
import { DataProviderContext } from "../main/App";

const People: React.FC<WithDataListProperties> = (properties: WithDataListProperties) => {
  const dataProvider = React.useContext(DataProviderContext);
  const { data } = properties;

  loadPageController(dataProvider.getPeople, properties);

  return <>{!!data && <EntitiesListView data={data} entityUrlId="people" />}</>;
};
People.displayName = "People";

export const PeopleList = withData(People);
PeopleList.displayName = "PeopleList";
