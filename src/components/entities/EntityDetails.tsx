import * as React from "react";
import { PartOfFilm, Film } from "../../models/entities";
import { ElementProps, WithDataProps } from "./WithData";
import { EntityDetailsView, EntityDetail } from "./EntityDetailsView";
import { useRouteId } from "./hooks";

export interface EntityDetailsWithFilms<T extends PartOfFilm> {
  entity: T;
  films: Film[];
  detailsToRender: EntityDetail[];
}

export interface EntityDetailsProps<T extends PartOfFilm> extends WithDataProps<EntityDetailsWithFilms<T>, ElementProps> {
  entityFetcher: (id: string) => Promise<T>;
  showLastModified?: boolean;
  imgBase?: string;
}

export const EntityDetails = <T extends PartOfFilm>(props: EntityDetailsProps<T>) => {
  const { id, error } = useRouteId();
  const { data, onData, onError, onLoading, dataProvider, entityFetcher, isLoading, imgBase, isError } = props;

  React.useEffect(() => {
    if (!data && !isLoading && !isError) {
      onLoading();
      if (error) onError(error.message);
      else if (id) entityFetcher(id)
        .then((entity) => {
          dataProvider.getFilmsForEntity(entity).then(films => {
            onData({ entity, films, detailsToRender: [] });
          })
        })
        .catch(onError);
    }
  }, [props, id]);

  if (data) {
    const renderFilms = data.films.map((f) => `${f.name} (${f.created.getFullYear()}, by ${f.director})`);
    return <EntityDetailsView
      caption={data?.entity.name}
      details={[{ label: "Films", value: renderFilms.join(", ") }, ...data.detailsToRender]}
      lastEdited={props.showLastModified ? data.entity.edited : undefined}
      img={imgBase && data ? `${imgBase}/${data?.entity.id}.jpg` : undefined}
    />;
  }
  else return <></>;
};

EntityDetails.displayName = "EntityDetails";
