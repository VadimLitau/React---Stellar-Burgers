import React from "react";
import Constructor from "../../pages/constructor";
import Login from "../../pages/login";
import Profile from "../../pages/profile";
import Registration from "../../pages/registration";
import Forgot from "../../pages/forgot";
import Reset from "../../pages/resetPassword";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Route path="/" exact={true}>
        <Constructor />
      </Route>
      <Route path="/login" exact={true}>
        <Login />
      </Route>
      <Route path="/profile" exact={true}>
        <Profile />
      </Route>
      <Route path="/registration" exact={true}>
        <Registration />
      </Route>
      <Route path="/forgot" exact={true}>
        <Forgot />
      </Route>
      <Route path="/resetPassword" exact={true}>
        <Reset />
      </Route>
    </Router>
  );
}

export default App;
