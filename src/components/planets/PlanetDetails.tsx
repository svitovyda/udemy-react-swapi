import * as React from "react";
import { Planet } from "../../models/entities";
import { displayNumber, WithDataDetailsProps } from "../entities/utils";
import { EntityDetails, EntityDetailsWithFilms } from "../entities/EntityDetails";
import { EntityDetail } from "../entities/EntityDetailsView";
import { withData } from "../entities/WithData";
import { DataProvider } from "../../services/DataProvider";

const planetToDetails = async (planet: Planet, dataProvider: DataProvider): Promise<EntityDetail[]> => {
  const details: EntityDetail[] = [
    { label: "Population", value: displayNumber(planet.population, "Unpopulated") },
    { label: "Rotation Period", value: displayNumber(planet.rotationPeriod, "Unknown") },
    { label: "Diameter", value: displayNumber(planet.diameter, "Unknown") },
    { label: "Climat", value: planet.climate },
    { label: "Terrain", value: planet.terrain },
    { label: "Created", value: planet.created.getFullYear().toString() }
  ];
  return planet.residents.length === 0 ? details : Promise.all(planet.residents.map((r) => dataProvider.getPerson(r)))
    .then((residents) => [...details, { label: "Residents", value: residents.map((r) => `${r.name} (${r.birthYear})`).join(", ") }])
}

const PlanetRenderer: React.FC<WithDataDetailsProps<Planet>> = (props: WithDataDetailsProps<Planet>) => {
  const { onData, ...rest } = props;
  const { dataProvider, onError, onLoading, settings } = rest;

  const onEntityData = React.useCallback((data: EntityDetailsWithFilms<Planet>) => {
    onLoading();
    planetToDetails(data.entity, dataProvider).then((details) => onData({ ...data, detailsToRender: details })).catch(onError);
  }, [onLoading, dataProvider]);

  return <EntityDetails
    {...rest}
    onData={onEntityData}
    entityFetcher={dataProvider.getPlanet}
    imgBase={settings.planetAssetsUrl}
  />;
};

export const PlanetDetails = withData(PlanetRenderer);
PlanetDetails.displayName = "PlanetDetails";
