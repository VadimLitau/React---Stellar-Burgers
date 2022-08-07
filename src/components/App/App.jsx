import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Constructor from "../../pages/constructor";
import Login from "../../pages/login";
import Profile from "../../pages/profile";
import Registration from "../../pages/registration";
import Forgot from "../../pages/forgot";
import Reset from "../../pages/resetPassword";
import PageNotFound from "../../pages/page404";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Modal/IngridientDetails/IngridientDetails";
import Feeds from "../../pages/feeds";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { ProvideAuth } from "../../services/auth";
import { useAuth } from "../../services/auth";
import { getUserDate } from "../../services/actions/route";
import { getApiBurgerData } from "../../services/actions";
import AppHeader from "../AppHeader/AppHeader";

function App() {
  const history = useHistory();
  const userAuth = useSelector((store) => store.route.userAuthorizationSuccess);
  const burgerData = useSelector((store) => store.item.burgerData);
  const auth = useAuth();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!userAuth) {
      document.title = "react burger";
      dispatch(getUserDate(auth.user));
    }
  }, [dispatch, userAuth]);

  React.useEffect(() => {
    if (burgerData.length === 0) {
      document.title = "react burger";
      dispatch(getApiBurgerData());
    }
  }, [dispatch]);

  const location = useLocation();

  const background = location.state?.background;
  // console.log(location);
  // console.log(background);
  function closeModals() {
    history.push("/");
  }
  //console.log(burgerData.length);
  return (
    <ProvideAuth>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <Profile />
        </ProtectedRoute>
        <Route path="/register" exact={true}>
          <Registration />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <Forgot />
        </Route>
        <Route path="/reset-password" exact={true}>
          <Reset />
        </Route>
        <Route path="/" exact={true}>
          <Constructor />
        </Route>
        <Route>
          <Feeds path="/feeds" />
        </Route>
        <Route path={"/ingredients/:id"} exact>
          <IngredientDetails />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      {background && (
        <Route path={"/ingredients/:id"}>
          <Modal closeModal={closeModals} title={"Детали Ингредиента"}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </ProvideAuth>
  );
}

export default App;
