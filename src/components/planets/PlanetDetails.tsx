import * as React from "react";
import type { Planet } from "../../models/entities";
import { DataProvider } from "../../services/DataProvider";
import { EntityDetails } from "../entities/EntityDetails";
import type { EntityDetailsWithFilms } from "../entities/EntityDetails";
import type { EntityDetail } from "../entities/EntityDetailsView";
import { withData } from "../entities/WithData";
import { displayNumber } from "../entities/utils";
import type { WithDataDetailsProps as WithDataDetailsProperties } from "../entities/utils";
import { ConfigContext, DataProviderContext } from "../main/App";

const planetToDetails = async (planet: Planet, dataProvider: DataProvider): Promise<EntityDetail[]> => {
  const details: EntityDetail[] = [
    { label: "Population", value: displayNumber(planet.population, "Unpopulated") },
    { label: "Rotation Period", value: displayNumber(planet.rotationPeriod, "Unknown") },
    { label: "Diameter", value: displayNumber(planet.diameter, "Unknown") },
    { label: "Climat", value: planet.climate },
    { label: "Terrain", value: planet.terrain },
    { label: "Created", value: planet.created.getFullYear().toString() }
  ];
  return planet.residents.length === 0
    ? details
    : Promise.all(planet.residents.map((r) => dataProvider.getPerson(r))).then((residents) => [
        ...details,
        { label: "Residents", value: residents.map((r) => `${r.name} (${r.birthYear})`).join(", ") }
      ]);
};

const PlanetRenderer: React.FC<WithDataDetailsProperties<Planet>> = (properties: WithDataDetailsProperties<Planet>) => {
  const settings = React.useContext(ConfigContext);
  const dataProvider = React.useContext(DataProviderContext);

  const { onData, ...rest } = properties;
  const { onError, onLoading } = rest;

  const onEntityData = React.useCallback(
    (data: EntityDetailsWithFilms<Planet>) => {
      onLoading();
      planetToDetails(data.entity, dataProvider)
        .then((details) => onData({ ...data, detailsToRender: details }))
        .catch(onError);
    },
    [onLoading, dataProvider, onData, onError]
  );

  return (
    <EntityDetails
      {...rest}
      onData={onEntityData}
      entityFetcher={dataProvider.getPlanet}
      imgBase={settings.planetAssetsUrl}
    />
  );
};

export const PlanetDetails = withData(PlanetRenderer);
PlanetDetails.displayName = "PlanetDetails";
