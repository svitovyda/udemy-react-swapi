import * as React from "react";
import { Starship } from "../../models/entities";
import { DataProvider } from "../../services/DataProvider";
import { Data, displayNumber } from "../entities/utils";
import { useParams } from "react-router-dom";
import { EntityDetailsController, EntityProps } from "../entities/EntityDetailsController";
import { EntityDetail } from "../entities/DetailsList";

export const starshipToDetails = (starship: Starship | undefined): EntityDetail[] =>
  starship
    ? [
        { label: "Model", value: starship.model },
        { label: "Cost", value: displayNumber(starship.cost, "Unknown") },
        { label: "Manufacturer", value: starship.manufacturer },
        { label: "Starship Class", value: starship.starshipClass },
        { label: "Crew", value: displayNumber(starship.crew) },
        { label: "Passengers", value: displayNumber(starship.passengers) },
        { label: "Cargo Capacity", value: starship.cargoCapacity }
      ]
    : [];

export const StarshipDetailsController: React.FC = () => {
  const [dataProvider, setDataProvider] = React.useState<DataProvider | undefined>(undefined);
  DataProvider.getInstance().then(setDataProvider);
  const [starship, setStarship] = React.useState<Data<Starship>>("loading");

  const { id } = useParams<EntityProps>();

  React.useEffect(() => {
    setStarship("loading");
    if (id && dataProvider) dataProvider?.getStarship(id).then((p) => (p ? setStarship(p) : setStarship("error")));
  }, [id, dataProvider]);

  if (starship === "loading" || !dataProvider) return <>Loading...</>;
  if (starship === "error") return <>Error</>;
  return (
    <EntityDetailsController
      entity={starship}
      detailsToRender={starshipToDetails(starship)}
      filmFetcher={dataProvider.getFilm}
      showLastModified
    />
  );
};

StarshipDetailsController.displayName = "StarshipDetailsController";
