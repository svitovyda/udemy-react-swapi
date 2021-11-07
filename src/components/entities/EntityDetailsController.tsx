import * as React from "react";
import { Film, PartOfFilm } from "../../models/entities";
import { Data, getAllFilms } from "./utils";
import { DetailsList, DetailsListProps, EntityDetail } from "./DetailsList";

export interface EntityProps {
  id?: string;
}

export interface EntityDetailsControllerProps<T extends PartOfFilm> {
  entity: T;
  showLastModified?: boolean;
  detailsToRender?: EntityDetail[];
  filmFetcher: (id: string) => Promise<Film>;
}

export const EntityDetailsController: React.FC<EntityDetailsControllerProps<PartOfFilm>> = <T extends PartOfFilm>(
  props: EntityDetailsControllerProps<T>
) => {
  const [data, setData] = React.useState<Data<DetailsListProps>>("loading");

  React.useEffect(() => {
    const details: EntityDetail[] = props.detailsToRender ?? [];
    const result: DetailsListProps = {
      caption: props.entity.name,
      details,
      lastEdited: props.showLastModified ? props.entity.edited : undefined
    };
    if (props.filmFetcher)
      getAllFilms(props.entity, props.filmFetcher).then((f) => {
        setData({
          ...result,
          details: [{ label: "Films", value: f.length > 0 ? f.join(", ") : "N/a" }, ...result.details]
        });
      });
    else setData(result);
  }, [props]);

  if (data === "error") return <>Error</>;
  if (data === "loading") return <>Loading...</>;
  return <DetailsList {...data} />;
};

EntityDetailsController.displayName = "EntityDetailsController";
