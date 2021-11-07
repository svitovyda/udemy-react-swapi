import * as React from "react";
import { DataProvider } from "../../services/DataProvider";
import { EntitiesListController, PageProps } from "../entities/EntitiesListController";
import { useParams } from "react-router-dom";

export const StarshipsList: React.FC = () => {
  const [dataProvider, setDataProvider] = React.useState<DataProvider | undefined>(undefined);
  DataProvider.getInstance().then(setDataProvider);

  const { page } = useParams<PageProps>();

  return dataProvider ? (
    <EntitiesListController
      page={page}
      entitiesFetcher={dataProvider.getStarships}
      entityUrlId="starships"
      filmFetcher={dataProvider.getFilm}
    />
  ) : (
    <>Loading...</>
  );
};

StarshipsList.displayName = "StarshipsList";
