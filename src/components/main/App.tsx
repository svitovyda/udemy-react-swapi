import * as React from "react";
import styled from "@emotion/styled";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header, HeaderItem } from "../navigation/Header";
import { SwapiService } from "../../services/SwapiService";
import { MainPage } from "./MainPage";
import { PersonDetails } from "../people/PersonDetails";
import { PeopleList } from "../people/PeopleList";
import { PlanetsList } from "../planets/PlanetsList";
import { PlanetDetails } from "../planets/PlanetDetails";
import { StarshipDetails } from "../starships/StarshipDetails";
import { StarshipsList } from "../starships/StarshipsList";
import { DataProvider } from "../../services/DataProvider";

const AppContainer = styled.div({
  width: "80%",
  margin: "auto"
});

const HeaderNav = styled.div({
  display: "flex",
  justifyContent: "center",
  marginTop: 50
});

const AppMainPage = styled.div({
  display: "flex",
  width: "100%"
});

const AppComponents = styled.div({
  display: "flex",
  width: "100%"
});

const App: React.FC<{}> = () => {
  const [dataAvailable, setDataAvailable] = React.useState(false);
  const dataProvider = DataProvider.getInstance(new SwapiService());

  dataProvider.init().then(() => setDataAvailable(true));

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

  return dataAvailable ? (
    <Router>
      <AppContainer>
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
            <Route path="/people/?page=:page" component={PeopleList} />
          </Switch>
          <Switch>
            <Route path="/people/id=:id" component={PersonDetails} />
          </Switch>
          <Switch>
            <Route path="/planets/?page=:page" component={PlanetsList} />
          </Switch>
          <Switch>
            <Route path="/planets/id=:id" component={PlanetDetails} />
          </Switch>
          <Switch>
            <Route path="/starships/?page=:page" component={StarshipsList} />
          </Switch>
          <Switch>
            <Route path="/starships/id=:id" component={StarshipDetails} />
          </Switch>
        </AppComponents>
      </AppContainer>
    </Router>
  ) : (
    <AppContainer>Loading... </AppContainer>
  );
};

App.displayName = "App";

export default App;
