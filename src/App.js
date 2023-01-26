import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import InSteps from "./components/LinealProgramming/InSteps";
import LinealProgramming from './components/LinealProgramming'
import SinglePage from "./components/LinealProgramming/SinglePage";

const App = () => 
    <Switch>
      <Route exact path="/LinealProgramming" component={LinealProgramming} />
      {/* <Route exact path="/LinealProgramming/InSteps" component={InSteps} /> */}
      <Route exact path="/LinealProgramming/SinglePage" component={SinglePage} />
      
      <Redirect to="/LinealProgramming/SinglePage" />
    </Switch>;

export default App;
