import React from "react";
import Constructor from "../../pages/constructor";
import Login from "../../pages/login";
import Profile from "../../pages/profile";
import Registration from "../../pages/registration";
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
    </Router>
  );
}

export default App;
