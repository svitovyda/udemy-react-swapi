import * as React from "react";
import { Person } from "../../models/entities";
import { DataProvider } from "../../services/DataProvider";
import { EntityDetails, EntityDetailsWithFilms } from "../entities/EntityDetails";
import { EntityDetail } from "../entities/EntityDetailsView";
import { withData } from "../entities/WithData";
import { displayNumber, WithDataDetailsProps as WithDataDetailsProperties } from "../entities/utils";
import { ConfigContext, DataProviderContext } from "../main/App";

const personToDetails = async (person: Person, dataProvider: DataProvider): Promise<EntityDetail[]> => {
  const details: EntityDetail[] = [
    { label: "Gender", value: person.gender },
    { label: "Height", value: displayNumber(person.height, "Unknown") },
    { label: "Mass", value: displayNumber(person.mass, "Unknown") },
    { label: "Skin Color", value: person.skinColor },
    { label: "Hair Color", value: person.hairColor ?? "No hair" },
    { label: "Eye Color", value: person.eyeColor }
  ];
  if (!person.homeworld) return details;

  return dataProvider
    .getPlanet(person.homeworld)
    .then((planet) => [...details, { label: "Home World", value: planet.name }])
    .catch(() => details);
};

const PersonRenderer: React.FC<WithDataDetailsProperties<Person>> = (properties: WithDataDetailsProperties<Person>) => {
  const settings = React.useContext(ConfigContext);
  const dataProvider = React.useContext(DataProviderContext);
  const { onData, ...rest } = properties;
  const { onError, onLoading } = rest;

  const onEntityData = React.useCallback(
    (data: EntityDetailsWithFilms<Person>) => {
      onLoading();
      personToDetails(data.entity, dataProvider)
        .then((details) => onData({ ...data, detailsToRender: details }))
        .catch(onError);
    },
    [onLoading, dataProvider, onError, onData]
  );

  return (
    <EntityDetails
      {...rest}
      onData={onEntityData}
      entityFetcher={dataProvider.getPerson}
      imgBase={settings.personAssetsUrl}
      showLastModified
    />
  );
};

export const PersonDetails = withData(PersonRenderer);
PersonDetails.displayName = "PersonDetails";
