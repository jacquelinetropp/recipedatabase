import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AddRecipe from "./pages/AddRecipe";
import RecipePage from "./pages/RecipePage";

function App({ authenticated }) {
  let routes;

  if (authenticated) {
    routes = (
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/addrecipe" component={AddRecipe} />
        <Route path="/:recipeid" component={RecipePage} />
      </Fragment>
    );
  } else {
    routes = (
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/addrecipe" component={AddRecipe} />
        <Route path="/:recipeid" component={RecipePage} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar />
      <Switch>
        {routes}
      </Switch>
    </Fragment>
  );
}

const mapStateToProps = ({ firebase }) => ({
  authenticated: firebase.auth.uid
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(App);
