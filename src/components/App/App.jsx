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
import IngredientDetailsPage from "../Modal/IngridientDetails/IngridientDetailsPage";
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
import Ingredient from "../BurgerIngredients/Ingredient/Ingredient";
import { getApiBurgerData } from "../../services/actions";

function App() {
  const history = useHistory();
  const userAuth = useSelector((store) => store.route.userAuthorizationSuccess);
  const auth = useAuth();
  const dispatch = useDispatch();
  React.useEffect(() => {
    document.title = "react burger";
    dispatch(getApiBurgerData());
    dispatch(getUserDate(auth.user));
  }, [dispatch, auth]);

  const location = useLocation();

  const background = location.state?.background;
  // console.log(location);
  // console.log(background);
  function closeModals() {
    history.push("/");
  }

  return (
    <ProvideAuth>
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
