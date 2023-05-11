import * as React from "react";
import type { PartOfFilm, Film } from "../../models/entities";
import { DataProviderContext } from "../main/App";
import { EntityDetailsView } from "./EntityDetailsView";
import type { EntityDetail } from "./EntityDetailsView";
import type { ElementProps as ElementProperties, WithDataProps as WithDataProperties } from "./WithData";
import { useRouteId } from "./hooks";

export interface EntityDetailsWithFilms<T extends PartOfFilm> {
  entity: T;
  films: Film[];
  detailsToRender: EntityDetail[];
}

export interface EntityDetailsProperties<T extends PartOfFilm>
  extends WithDataProperties<EntityDetailsWithFilms<T>, ElementProperties> {
  entityFetcher: (id: string) => Promise<T>;
  showLastModified?: boolean;
  imgBase?: string;
}

export const EntityDetails = <T extends PartOfFilm>(properties: EntityDetailsProperties<T>) => {
  const { id, error } = useRouteId();
  const dataProvider = React.useContext(DataProviderContext);
  const { data, onData, onError, onLoading, entityFetcher, isLoading, imgBase, isError } = properties;

  React.useEffect(() => {
    if (!data && !isLoading && !isError) {
      onLoading();
      if (error) onError(error.message);
      else if (id)
        entityFetcher(id)
          .then((entity) => {
            dataProvider.getFilmsForEntity(entity).then((films) => {
              onData({ entity, films, detailsToRender: [] });
            });
          })
          .catch(onError);
    }
  }, [id, onData, isLoading, data, isError, dataProvider, entityFetcher, error, onError, onLoading]);

  if (data) {
    const renderFilms = data.films.map((f) => `${f.name} (${f.created.getFullYear()}, by ${f.director})`);
    return (
      <EntityDetailsView
        caption={data?.entity.name}
        details={[{ label: "Films", value: renderFilms.join(", ") }, ...data.detailsToRender]}
        lastEdited={properties.showLastModified ? data.entity.edited : undefined}
        img={imgBase && data ? `${imgBase}/${data?.entity.id}.jpg` : undefined}
      />
    );
  } else return <></>;
};

EntityDetails.displayName = "EntityDetails";
