import * as React from "react";
import { Person } from "../../models/entities";
import { displayNumber, WithDataDetailsProps } from "../entities/utils";
import { EntityDetails, EntityDetailsWithFilms } from "../entities/EntityDetails";
import { EntityDetail } from "../entities/EntityDetailsView";
import { withData } from "../entities/WithData";
import { DataProvider } from "../../services/DataProvider";

const personToDetails = async (
  person: Person,
  dataProvider: DataProvider
): Promise<EntityDetail[]> => {
  const details: EntityDetail[] = [
    { label: "Gender", value: person.gender },
    { label: "Height", value: displayNumber(person.height, "Unknown") },
    { label: "Mass", value: displayNumber(person.mass, "Unknown") },
    { label: "Skin Color", value: person.skinColor },
    { label: "Hair Color", value: person.hairColor ?? "No hair" },
    { label: "Eye Color", value: person.eyeColor }
  ];
  if (!person.homeworld) return details;

  return dataProvider.getPlanet(person.homeworld)
    .then((planet) => [...details, { label: "Home World", value: planet.name }])
    .catch(() => details);
};

const PersonRenderer: React.FC<WithDataDetailsProps<Person>> = (props: WithDataDetailsProps<Person>) => {
  const { onData, ...rest } = props;
  const { dataProvider, onError, onLoading, settings } = rest;

  const onEntityData = React.useCallback((data: EntityDetailsWithFilms<Person>) => {
    onLoading();
    personToDetails(data.entity, dataProvider).then((details) => onData({ ...data, detailsToRender: details })).catch(onError);
  }, [onLoading, dataProvider]);

  return <EntityDetails
    {...rest}
    onData={onEntityData}
    entityFetcher={dataProvider.getPerson}
    imgBase={settings.personAssetsUrl}
    showLastModified
  />;
};

export const PersonDetails = withData(PersonRenderer);
PersonDetails.displayName = "PersonDetails";
