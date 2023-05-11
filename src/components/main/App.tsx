import styled from "@emotion/styled";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigService } from "../../services/ConfigService";
import type { Config } from "../../services/ConfigService";
import { DataProvider } from "../../services/DataProvider";
import { SwapiService } from "../../services/SwapiService";
import { WithLoaderAndError } from "../general/WithLoaderAndError";
import { PeopleList } from "../people/PeopleList";
import { PersonDetails } from "../people/PersonDetails";
import { PlanetDetails } from "../planets/PlanetDetails";
import { PlanetsList } from "../planets/PlanetsList";
import { StarshipDetails } from "../starships/StarshipDetails";
import { StarshipsList } from "../starships/StarshipsList";
import { Header } from "./Header";
import type { HeaderItem } from "./Header";
import { MainPage } from "./MainPage";

const AppContainer = styled.div({
  width: "80%",
  height: "90%",
  margin: "auto",
  marginTop: 15
});

const HeaderNav = styled.div({
  display: "flex",
  justifyContent: "center"
});

const AppMainPage = styled.div({
  display: "flex",
  width: "100%"
});

const AppComponents = styled.div({
  display: "flex",
  width: "100%"
});

const config = ConfigService.getConfig();
const swapiService = new SwapiService(config);
const dataProvider = new DataProvider(swapiService);
export const ConfigContext = React.createContext<Config>(config);
export const DataProviderContext = React.createContext<DataProvider>(dataProvider);

const App: React.FC = () => {
  const [error, setError] = React.useState<Error | undefined>();
  const [loading, setLoading] = React.useState(true);

  dataProvider
    .init()
    .then(() => setLoading(false))
    .catch((error_) => setError(error_));

  const items: HeaderItem[] = [
    {
      id: "people",
      caption: "People"
    },
    {
      id: "planets",
      caption: "Planets"
    },
    {
      id: "starships",
      caption: "Starships"
    }
  ];

  return (
    <AppContainer>
      <WithLoaderAndError loading={loading} error={error}>
        <BrowserRouter>
          <HeaderNav>
            <Header items={items} />
          </HeaderNav>

          <ConfigContext.Provider value={config}>
            <DataProviderContext.Provider value={dataProvider}>
              <AppMainPage>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                </Routes>
              </AppMainPage>
              <AppComponents>
                <Routes>
                  <Route path="/people/:page" Component={PeopleList} />
                  <Route path="/people/details/:id" Component={PersonDetails} />
                  <Route path="/planets/:page" Component={PlanetsList} />
                  <Route path="/planets/details/:id" Component={PlanetDetails} />
                  <Route path="/starships/:page" Component={StarshipsList} />
                  <Route path="/starships/details/:id" Component={StarshipDetails} />
                  <Route path="*" Component={PeopleList} />
                </Routes>
              </AppComponents>
            </DataProviderContext.Provider>
          </ConfigContext.Provider>
        </BrowserRouter>
      </WithLoaderAndError>
    </AppContainer>
  );
};

App.displayName = "App";

export default App;
