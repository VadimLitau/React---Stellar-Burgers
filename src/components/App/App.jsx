import React from "react";
import Constructor from "../../pages/constructor";
import Login from "../../pages/login";
import Profile from "../../pages/profile";
import Registration from "../../pages/registration";
import Forgot from "../../pages/forgot";
import Reset from "../../pages/resetPassword";
import PageNotFound from "../../pages/page404";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { ProvideAuth } from "../../services/auth";
function App() {
  return (
    <ProvideAuth>
    <Router>
      <Switch>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/profile" exact={true}>
          <Profile />
        </Route>
        <Route path="/register" exact={true}>
          <Registration />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <Forgot />
        </Route>
        <Route path="/reset-password" exact={true}>
          <Reset />
        </Route>
        <ProtectedRoute path="/" exact={true}>
          <Constructor />
        </ProtectedRoute>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
    </ProvideAuth>
  );
}

export default App;
