import * as React from "react";
import styled from "@emotion/styled";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header, HeaderItem } from "./Header";
import { SwapiService } from "../../services/SwapiService";
import { MainPage } from "./MainPage";
import { PersonDetails } from "../people/PersonDetails";
import { StarshipDetails } from "../starships/StarshipDetails";
import { DataProvider } from "../../services/DataProvider";
import { PlanetDetails } from "../planets/PlanetDetails";
import { PeopleList } from "../people/PeopleList";
import { PlanetsList } from "../planets/PlanetsList";
import { StarshipsList } from "../starships/StarshipsList";
import { WithLoaderAndError } from "../general/WithLoaderAndError";
import { Config, ConfigService } from "../../services/ConfigService";

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
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);

  dataProvider.init()
    .then(() => setLoading(false))
    .catch((e) => setError(e));

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
        <Router>
          <HeaderNav>
            <Header items={items} />
          </HeaderNav>

          <ConfigContext.Provider value={config}>
            <DataProviderContext.Provider value={dataProvider}>
              <AppMainPage>
                <Switch>
                  <Route path="/" exact component={MainPage} />
                </Switch>
              </AppMainPage>

              <AppComponents>
                <Switch>
                  <Route exact path="/people/:page" component={PeopleList} />
                </Switch>
                <Switch>
                  <Route exact path="/people/details/:id" component={PersonDetails} />
                </Switch>
                <Switch>
                  <Route exact path="/planets/:page" component={PlanetsList} />
                </Switch>
                <Switch>
                  <Route exact path="/planets/details/:id" component={PlanetDetails} />
                </Switch>
                <Switch>
                  <Route exact path="/starships/:page" component={StarshipsList} />
                </Switch>
                <Switch>
                  <Route exact path="/starships/details/:id" component={StarshipDetails} />
                </Switch>
              </AppComponents>
            </DataProviderContext.Provider>
          </ConfigContext.Provider>

        </Router>
      </WithLoaderAndError>
    </AppContainer>
  );
};

App.displayName = "App";

export default App;
