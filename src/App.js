import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Calculator from "./components/Calculator";
import Page from "./components/Calculator/Page";

const App = () => (
  <Switch>
    <Route exact path="/Calculator" component={Calculator} />
    <Route exact path="/Calculator/Page" component={Page} />

    <Redirect to="/Calculator" />
  </Switch>
);

export default App;
