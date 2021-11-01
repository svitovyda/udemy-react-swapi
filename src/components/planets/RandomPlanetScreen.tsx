import * as React from "react";
import { Planet } from "../../models/entities";
import { ConfigService } from "../../services/ConfigService";
import { DataProvider } from "../../services/DataProvider";
import { RandomPlanet } from "./RandomPlanet";

const MAX_ATTEMPTS = 10;

export const RandomPlanetScreen: React.FC = () => {
  const settings = ConfigService.getConfig();
  const dataProvider = DataProvider.getInstance();
  const maxPlanets: number = dataProvider.getPlanetsCount() ?? 0;

  console.log(maxPlanets, MAX_ATTEMPTS);

  const [currentPlanet, setCurrentPlanet] = React.useState<Planet | undefined>(undefined);

  const randomPlanet = async (): Promise<Planet | undefined> => {
    console.log(maxPlanets);
    if (maxPlanets < 2) return undefined;

    const generateNewId = (invalid: string[], attempts: number): string => {
      if (attempts < 1) return "2";
      const id = Math.ceil(Math.random() * (maxPlanets + 5)).toString();
      if (invalid.indexOf(id) === -1) return id;
      return generateNewId([...invalid, id], attempts - 1);
    };

    interface Aggr {
      attempts: number;
      invalid: string[]
    };
    const recursiveFunction = async (aggr: Aggr): Promise<Planet | undefined> => {
      console.log(aggr);
      if (aggr.attempts < 1) return undefined;
      const newId = generateNewId(aggr.invalid, 10);
      if (aggr.invalid.indexOf(newId) !== -1) return undefined;
      return await dataProvider.getPlanet(newId).then((planet) => {
        if (planet) return planet;
        return recursiveFunction({ attempts: aggr.attempts - 1, invalid: [...aggr.invalid, newId] });
      });
    }

    return recursiveFunction({ attempts: 10, invalid: currentPlanet ? [currentPlanet.id] : [] });
  };

  if(!currentPlanet) randomPlanet().then(setCurrentPlanet);

  const onShowRanomPlanet = React.useCallback(() => {
    setCurrentPlanet(undefined);
    randomPlanet().then(setCurrentPlanet);
  }, []);

  return(<RandomPlanet
      planet={currentPlanet}
      imageUrl={`${settings.planetAssetsUrl}/${currentPlanet?.id}.jpg`}
      onShowRanomPlanet={onShowRanomPlanet}
    />);
}

RandomPlanetScreen.displayName = "RandomPlanetScreen";
