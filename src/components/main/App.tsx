import * as React from "react";
import styled from "@emotion/styled";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header, HeaderItem } from "./Header";
import { SwapiService } from "../../services/SwapiService";
import { MainPage } from "./MainPage";
import { PersonDetailsController } from "../people/PersonDetailsController";
import { StarshipDetailsController } from "../starships/StarshipDetailsController";
import { DataProvider } from "../../services/DataProvider";
import { PlanetDetailsController } from "../planets/PlanetDetailsController";
import { PeopleList } from "../people/PeopleList";
import { PlanetsList } from "../planets/PlanetsList";
import { StarshipsList } from "../starships/StarshipsList";
import { WithLoader } from "../general/withLoader";

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

const App: React.FC = () => {
  const [dataProvider, setDataProvider] = React.useState<DataProvider | undefined>(undefined);
  const swapiService = React.useRef(new SwapiService());

  DataProvider.init(swapiService.current).then(setDataProvider);

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
      <WithLoader isLoading={!dataProvider}>
        <Router>
          <HeaderNav>
            <Header items={items} />
          </HeaderNav>
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
              <Route exact path="/people/details/:id" component={PersonDetailsController} />
            </Switch>
            <Switch>
              <Route exact path="/planets/:page" component={PlanetsList} />
            </Switch>
            <Switch>
              <Route exact path="/planets/details/:id" component={PlanetDetailsController} />
            </Switch>
            <Switch>
              <Route exact path="/starships/:page" component={StarshipsList} />
            </Switch>
            <Switch>
              <Route exact path="/starships/details/:id" component={StarshipDetailsController} />
            </Switch>
          </AppComponents>
        </Router>
      </WithLoader>
    </AppContainer>
  );
};

App.displayName = "App";

export default App;
