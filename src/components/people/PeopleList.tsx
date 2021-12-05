import * as React from "react";
import { EntitiesListView } from "../entities/EntitiesListView";
import { loadPageController } from "../entities/hooks";
import { WithDataListProps } from "../entities/utils";
import { withData } from "../entities/WithData";

const People: React.FC<WithDataListProps> = (props: WithDataListProps) => {

  const { data, dataProvider } = props;

  loadPageController(dataProvider.getPeople, props);

  return (
    <>
      {(!!data && <EntitiesListView data={data} entityUrlId="people" />)}
    </>
  );
};
People.displayName = "People";

export const PeopleList = withData(People);
PeopleList.displayName = "PeopleList";
