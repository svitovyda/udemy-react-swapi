import * as React from "react";
import { Planet } from "../../models/entities";
import { DataProvider } from "../../services/DataProvider";
import { RandomPlanetView } from "./RandomPlanetView";
import { ElementProps, withData, WithDataProps } from "../entities/WithData";

const MAX_ATTEMPTS = 10;

const getRandomPlanet = async (dataProvider: DataProvider, current?: Planet): Promise<Planet> => {
  const maxPlanets: number = dataProvider.getPlanetsCount() ?? 0;
  if (maxPlanets < 2) throw new Error("There are no planets available in DataProvider");

  const generateNewId = (invalid: string[], attempts: number): string => {
    if (attempts < 1) return "2";
    const id = Math.ceil(Math.random() * (maxPlanets + 5)).toString();
    if (invalid.indexOf(id) === -1) return id;
    return generateNewId([...invalid, id], attempts - 1);
  };

  interface Aggr {
    attempts: number;
    invalid: string[];
  }

  const recursiveFunction = async (aggr: Aggr): Promise<Planet> => {
    if (aggr.attempts < 1) throw new Error(`Can't fetch a valid planed after ${MAX_ATTEMPTS} attempts`);
    const newId = generateNewId(aggr.invalid, MAX_ATTEMPTS);
    if (aggr.invalid.indexOf(newId) !== -1) throw new Error(`Can't fetch a valid planed after ${MAX_ATTEMPTS} attempts`);
    return await dataProvider
      .getPlanet(newId)
      .then((planet) => {
        if (planet) return planet;
        return recursiveFunction({ attempts: aggr.attempts - 1, invalid: [...aggr.invalid, newId] });
      });
  };

  return recursiveFunction({
    attempts: MAX_ATTEMPTS,
    invalid: typeof current === "object" ? [current.id] : []
  });
};

const RandomPlanetRenderer: React.FC<WithDataProps<Planet, ElementProps>> = (props: WithDataProps<Planet, ElementProps>) => {
  const { settings, dataProvider, onData, onError, onLoading, data, isLoading } = props;

  const getNext = React.useCallback(() => {
    onLoading();
    getRandomPlanet(dataProvider, data).then((p) => {
      console.log(p);
      onData(p);
    }).catch(onError);
  }, [props]);

  React.useEffect(() => {
    if (!props.data && !props.isLoading) {
      getNext();
    }
  }, [getNext, props.data]);

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
