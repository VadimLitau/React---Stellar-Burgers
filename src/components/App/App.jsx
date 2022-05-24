import React from "react";
import Constructor from "../../pages/constructor";
import Login from "../../pages/login";
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
    </Router>
  );
}

export default App;
