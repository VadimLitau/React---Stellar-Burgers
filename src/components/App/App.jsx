import React from "react";
import { useDispatch,useSelector} from "react-redux";
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
import { useAuth } from "../../services/auth";
import { getUserDate } from "../../services/actions/route";
function App() {
  const userAuth  = useSelector((store) => store.route.userAuthorizationSuccess);
  const auth = useAuth()
  const dispatch = useDispatch();
  React.useEffect(() => {
    document.title = "react burger";
    dispatch(getUserDate(auth.user));
  }, [dispatch, userAuth]);
  return (
    <ProvideAuth>
    <Router>
      <Switch>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <Profile />
        </ProtectedRoute>
        <Route path="/register" exact={true}>
          <Registration />
        </Route>
        <Route path="/forgot-pasword" exact={true}>
          <Forgot />
        </Route>
        <Route path="/reset-password" exact={true}>
          <Reset />
        </Route>
        <Route path="/" exact={true}>
          <Constructor />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
    </ProvideAuth>
  );
}

export default App;
