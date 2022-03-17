import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Recipes from "./components/Recipes";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Recipe from "./components/Recipe";
import Create from "./components/Create";
import Settings from "./components/Settings";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/recipes">
          <Recipes />
        </Route>
        <Route path="/recipes/:_id" children={<Recipe />}></Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        {/* <Route path="*">
          <Error />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
