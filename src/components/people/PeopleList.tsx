import * as React from "react";
import { DataProvider } from "../../services/DataProvider";
import { EntitiesListController, PageProps } from "../entities/EntitiesListController";
import { useParams } from "react-router-dom";

export const PeopleList: React.FC = () => {
  const [dataProvider, setDataProvider] = React.useState<DataProvider | undefined>(undefined);
  DataProvider.getInstance().then(setDataProvider);

  const { page } = useParams<PageProps>();

  return dataProvider ? (
    <EntitiesListController
      page={page}
      entitiesFetcher={dataProvider.getPeople}
      entityUrlId="people"
      filmFetcher={dataProvider.getFilm}
    />
  ) : (
    <>Loading...</>
  );
};

PeopleList.displayName = "PeopleList";
