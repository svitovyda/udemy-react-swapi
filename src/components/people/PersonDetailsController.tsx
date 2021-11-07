import * as React from "react";
import { Person, Planet } from "../../models/entities";
import { DataProvider } from "../../services/DataProvider";
import { Data, displayNumber } from "../entities/utils";
import { useParams } from "react-router-dom";
import { EntityDetailsController, EntityDetailsControllerProps, EntityProps } from "../entities/EntityDetailsController";
import { EntityDetail } from "../entities/DetailsList";

export const personToDetails = async (
  person: Person | undefined,
  fetchPlanet: (id: string) => Promise<Planet>
): Promise<EntityDetail[]> => {
  if (!person) return [];
  const details = [
    { label: "Gender", value: person.gender },
    { label: "Height", value: displayNumber(person.height, "Unknown") },
    { label: "Mass", value: displayNumber(person.mass, "Unknown") },
    { label: "Skin Color", value: person.skinColor },
    { label: "Hair Color", value: person.hairColor ?? "No hair" },
    { label: "Eye Color", value: person.eyeColor }
  ];
  if (!person.homeworld) return details;

  return fetchPlanet(person.homeworld)
    .then((planet) => [...details, { label: "HomeWorld", value: planet.name }])
    .catch(() => details);
};

export const PersonDetailsController: React.FC = () => {
  const [dataProvider, setDataProvider] = React.useState<DataProvider | undefined>(undefined);
  DataProvider.getInstance().then(setDataProvider);
  const [data, setdata] = React.useState<Data<EntityDetailsControllerProps<Person>>>("loading");

  const { id } = useParams<EntityProps>();

  React.useEffect(() => {
    setdata("loading");
    if (id && dataProvider) dataProvider?.getPerson(id).then((p) => personToDetails(p, dataProvider.getPlanet).then(d => setdata({
      entity: p,
      filmFetcher: dataProvider.getFilm,
      detailsToRender: d,
      showLastModified: true
    })));
  }, [id, dataProvider]);

  if (data === "loading" || !dataProvider) return <>Loading...</>;
  if (data === "error") return <>Error</>;
  return <EntityDetailsController {...data} />;
};

PersonDetailsController.displayName = "PersonDetailsController";
