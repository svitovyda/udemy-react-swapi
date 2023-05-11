import * as React from "react";
import type { Planet } from "../../models/entities";
import { DataProvider } from "../../services/DataProvider";
import { withData } from "../entities/WithData";
import type { ElementProps as ElementProperties, WithDataProps as WithDataProperties } from "../entities/WithData";
import { ConfigContext, DataProviderContext } from "../main/App";
import { RandomPlanetView } from "./RandomPlanetView";

const MAX_ATTEMPTS = 10;

const getRandomPlanet = async (dataProvider: DataProvider, current?: Planet): Promise<Planet> => {
  const maxPlanets: number = dataProvider.getPlanetsCount() ?? 0;
  if (maxPlanets < 2) throw new Error("There are no planets available in DataProvider");

  const generateNewId = (invalid: string[], attempts: number): string => {
    if (attempts < 1) return "2";
    const id = Math.ceil(Math.random() * (maxPlanets + 5)).toString();
    if (!invalid.includes(id)) return id;
    return generateNewId([...invalid, id], attempts - 1);
  };

  interface Aggr {
    attempts: number;
    invalid: string[];
  }

  const recursiveFunction = async (aggr: Aggr): Promise<Planet> => {
    if (aggr.attempts < 1) throw new Error(`Can't fetch a valid planed after ${MAX_ATTEMPTS} attempts`);
    const newId = generateNewId(aggr.invalid, MAX_ATTEMPTS);
    if (aggr.invalid.includes(newId)) throw new Error(`Can't fetch a valid planed after ${MAX_ATTEMPTS} attempts`);
    return await dataProvider.getPlanet(newId).then((planet) => {
      if (planet) return planet;
      return recursiveFunction({ attempts: aggr.attempts - 1, invalid: [...aggr.invalid, newId] });
    });
  };

  return recursiveFunction({
    attempts: MAX_ATTEMPTS,
    invalid: typeof current === "object" ? [current.id] : []
  });
};

const RandomPlanetRenderer: React.FC<WithDataProperties<Planet, ElementProperties>> = (
  properties: WithDataProperties<Planet, ElementProperties>
) => {
  const settings = React.useContext(ConfigContext);
  const dataProvider = React.useContext(DataProviderContext);
  const { onData, onError, onLoading, data, isLoading } = properties;

  const getNext = React.useCallback(() => {
    onLoading();
    getRandomPlanet(dataProvider, data)
      .then((p) => {
        console.log(p);
        onData(p);
      })
      .catch(onError);
  }, [onLoading, dataProvider, data, onError, onData]);

  React.useEffect(() => {
    if (!properties.data && !properties.isLoading) {
      getNext();
    }
  }, [getNext, properties.data, properties.isLoading]);

  const onShowRanomPlanet = React.useCallback(getNext, [getNext]);

  return (
    <RandomPlanetView
      btnEnabled={!isLoading}
      planet={data}
      imageUrl={`${settings.planetAssetsUrl}/${data?.id}.jpg`}
      onShowRanomPlanet={onShowRanomPlanet}
    />
  );
};
RandomPlanetRenderer.displayName = "RandomPlanetRenderer";

export const RandomPlanet = withData(RandomPlanetRenderer);
RandomPlanet.displayName = "RandomPlanet";
