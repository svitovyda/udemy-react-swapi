import * as React from "react";
import { EntitiesList, EntitiesListProps } from "./EntitiesList";
import { Data, entityToShort } from "./utils";
import { EntitiesPage, Film, PartOfFilm } from "../../models/entities";

export interface PageProps {
  page?: string;
}

export interface EntitiesListControllerProps extends PageProps {
  entityUrlId: string;
  entitiesFetcher: (page: number) => Promise<EntitiesPage<PartOfFilm>>;
  filmFetcher: (id: string) => Promise<Film>;
}

export const EntitiesListController: React.FC<EntitiesListControllerProps> = (props) => {
  const [data, setData] = React.useState<Data<EntitiesListProps>>("loading");

  React.useEffect(() => {
    const pageNumber = props.page ? Number(props.page) : 1;
    if (Number.isNaN(pageNumber) || !Number.isInteger(pageNumber) || pageNumber < 1) setData("error");
    else {
      setData("loading");

      props.entitiesFetcher(pageNumber).then((page) => {
        Promise.all(page.results.map(entityToShort(props.filmFetcher))).then((shorts) =>
          setData({
            currentPage: pageNumber,
            next: page.next,
            previous: page.previous,
            data: shorts,
            entityId: props.entityUrlId
          })
        );
      });
    }
  }, [props.filmFetcher, props.page, props.entityUrlId, props.entitiesFetcher]);

  if (data === "loading") return <>Loading...</>;
  if (data === "error") return <>Error 4</>;
  return <EntitiesList {...data} />;
};

EntitiesListController.displayName = "EntitiesListController";
