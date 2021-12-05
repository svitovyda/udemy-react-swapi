import * as React from "react";
import { Starship } from "../../models/entities";
import { displayNumber, WithDataDetailsProps } from "../entities/utils";
import { EntityDetails, EntityDetailsWithFilms } from "../entities/EntityDetails";
import { EntityDetail } from "../entities/EntityDetailsView";
import { withData } from "../entities/WithData";
import { DataProvider } from "../../services/DataProvider";

const starshipToDetails = async (starship: Starship, dataProvider: DataProvider): Promise<EntityDetail[]> => {
  const details: EntityDetail[] = [
    { label: "Model", value: starship.model },
    { label: "Cost", value: displayNumber(starship.cost, "Unknown") },
    { label: "Manufacturer", value: starship.manufacturer },
    { label: "Starship Class", value: starship.starshipClass },
    { label: "Crew", value: displayNumber(starship.crew) },
    { label: "Passengers", value: displayNumber(starship.passengers) },
    { label: "Cargo Capacity", value: starship.cargoCapacity }
  ]
  return starship.pilots.length === 0 ? details :
    Promise.all(starship.pilots.map((p) => dataProvider.getPerson(p)))
      .then((pilots) => [...details, { label: "Pilots", value: pilots.map((p) => p.name).join(", ") }]);
}

const StarshipRenderer: React.FC<WithDataDetailsProps<Starship>> = (props: WithDataDetailsProps<Starship>) => {
  const { onData, ...rest } = props;
  const { dataProvider, onError, onLoading, settings } = rest;

  const onEntityData = React.useCallback((data: EntityDetailsWithFilms<Starship>) => {
    onLoading();
    starshipToDetails(data.entity, dataProvider).then((details) => onData({ ...data, detailsToRender: details })).catch(onError);
  }, [onLoading, dataProvider]);

  return <EntityDetails
    {...rest}
    onData={onEntityData}
    entityFetcher={dataProvider.getStarship}
    imgBase={settings.starshipAssetsUrl}
    showLastModified
  />;
};

export const StarshipDetails = withData(StarshipRenderer);
StarshipDetails.displayName = "StarshipDetails";
