import * as React from "react";
import { Planet } from "../../models/entities";
import { ConfigService } from "../../services/ConfigService";
import { DataProvider } from "../../services/DataProvider";
import { RandomPlanet } from "./RandomPlanet";
import { Data } from "../entities/utils";

const MAX_ATTEMPTS = 10;

const getRandomPlanet = async (dataProvider: DataProvider, current: Data<Planet>): Promise<Data<Planet>> => {
    if (!dataProvider) return "loading";
    const maxPlanets: number = dataProvider.getPlanetsCount() ?? 0;
    if (maxPlanets < 2) return "error";

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

    const recursiveFunction = async (aggr: Aggr): Promise<Data<Planet>> => {
      if (aggr.attempts < 1) return "error";
      const newId = generateNewId(aggr.invalid, MAX_ATTEMPTS);
      if (aggr.invalid.indexOf(newId) !== -1) return "error";
      return await dataProvider
        .getPlanet(newId)
        .then((planet) => {
          if (planet) return planet;
          return recursiveFunction({ attempts: aggr.attempts - 1, invalid: [...aggr.invalid, newId] });
        })
        .catch(() => {
          return "error";
        });
    };

    return recursiveFunction({
      attempts: MAX_ATTEMPTS,
      invalid: typeof current === "object" ? [current.id] : []
    });
  };

export const RandomPlanetController: React.FC = () => {
  const settings = ConfigService.getConfig();
  const [dataProvider, setDataProvider] = React.useState<DataProvider | undefined>(undefined);
  DataProvider.getInstance().then(setDataProvider);

  const [currentPlanet, setCurrentPlanet] = React.useState<Data<Planet>>("loading");

  React.useEffect(() => {
    if (!dataProvider) setCurrentPlanet("loading");
    else if (typeof currentPlanet === "string") getRandomPlanet(dataProvider, currentPlanet).then(setCurrentPlanet);
  }, [dataProvider]);

  const onShowRanomPlanet = React.useCallback(() => {
    const current = currentPlanet;
    setCurrentPlanet("loading");
    if (dataProvider) getRandomPlanet(dataProvider, current).then(setCurrentPlanet);
  }, [dataProvider, currentPlanet]);

  if (currentPlanet === "error") return <RandomPlanet onShowRanomPlanet={onShowRanomPlanet} />;
  if (currentPlanet === "loading") return <>Loading...</>;
  return (
    <RandomPlanet
      planet={currentPlanet}
      imageUrl={`${settings.planetAssetsUrl}/${currentPlanet?.id}.jpg`}
      onShowRanomPlanet={onShowRanomPlanet}
    />
  );
};

RandomPlanetController.displayName = "RandomPlanetController";
