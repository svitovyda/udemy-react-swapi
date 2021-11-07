import * as React from "react";
import { Planet } from "../../models/entities";
import { DataProvider } from "../../services/DataProvider";
import { Data, displayNumber } from "../entities/utils";
import { useParams } from "react-router-dom";
import { EntityDetailsController, EntityProps } from "../entities/EntityDetailsController";
import { EntityDetail } from "../entities/DetailsList";

export const planetToDetails = (planet: Planet | undefined): EntityDetail[] =>
  planet
    ? [
        { label: "Population", value: displayNumber(planet.population, "Unpopulated") },
        { label: "Rotation Period", value: displayNumber(planet.rotationPeriod, "Unknown") },
        { label: "Diameter", value: displayNumber(planet.diameter, "Unknown") },
        { label: "Climat", value: planet.climate },
        { label: "Terrain", value: planet.terrain }
      ]
    : [];

export const PlanetDetailsController: React.FC = () => {
  const [dataProvider, setDataProvider] = React.useState<DataProvider | undefined>(undefined);
  DataProvider.getInstance().then(setDataProvider);
  const [planet, setPlanet] = React.useState<Data<Planet>>("loading");

  const { id } = useParams<EntityProps>();

  React.useEffect(() => {
    setPlanet("loading");
    if (id && dataProvider) dataProvider?.getPlanet(id).then((p) => (p ? setPlanet(p) : setPlanet("error")));
  }, [id, dataProvider]);

  if (planet === "loading" || !dataProvider) return <>Loading...</>;
  if (planet === "error") return <>Error</>;
  return (
    <EntityDetailsController
      entity={planet}
      detailsToRender={planetToDetails(planet)}
      filmFetcher={dataProvider.getFilm}
      showLastModified
    />
  );
};

PlanetDetailsController.displayName = "PlanetDetailsController";
