import * as React from "react";
import { Starship } from "../../models/entities";
import { DataProvider } from "../../services/DataProvider";
import { EntityDetails, EntityDetailsWithFilms } from "../entities/EntityDetails";
import { EntityDetail } from "../entities/EntityDetailsView";
import { withData } from "../entities/WithData";
import { displayNumber, WithDataDetailsProps as WithDataDetailsProperties } from "../entities/utils";
import { ConfigContext, DataProviderContext } from "../main/App";

const starshipToDetails = async (starship: Starship, dataProvider: DataProvider): Promise<EntityDetail[]> => {
  const details: EntityDetail[] = [
    { label: "Model", value: starship.model },
    { label: "Cost", value: displayNumber(starship.cost, "Unknown") },
    { label: "Manufacturer", value: starship.manufacturer },
    { label: "Starship Class", value: starship.starshipClass },
    { label: "Crew", value: displayNumber(starship.crew) },
    { label: "Passengers", value: displayNumber(starship.passengers) },
    { label: "Cargo Capacity", value: starship.cargoCapacity }
  ];
  return starship.pilots.length === 0
    ? details
    : Promise.all(starship.pilots.map((p) => dataProvider.getPerson(p))).then((pilots) => [
        ...details,
        { label: "Pilots", value: pilots.map((p) => p.name).join(", ") }
      ]);
};

const StarshipRenderer: React.FC<WithDataDetailsProperties<Starship>> = (
  properties: WithDataDetailsProperties<Starship>
) => {
  const { onData, ...rest } = properties;
  const settings = React.useContext(ConfigContext);
  const dataProvider = React.useContext(DataProviderContext);
  const { onError, onLoading } = rest;

  const onEntityData = React.useCallback(
    (data: EntityDetailsWithFilms<Starship>) => {
      onLoading();
      starshipToDetails(data.entity, dataProvider)
        .then((details) => onData({ ...data, detailsToRender: details }))
        .catch(onError);
    },
    [onLoading, dataProvider, onData, onError]
  );

  return (
    <EntityDetails
      {...rest}
      onData={onEntityData}
      entityFetcher={dataProvider.getStarship}
      imgBase={settings.starshipAssetsUrl}
      showLastModified
    />
  );
};

export const StarshipDetails = withData(StarshipRenderer);
StarshipDetails.displayName = "StarshipDetails";
