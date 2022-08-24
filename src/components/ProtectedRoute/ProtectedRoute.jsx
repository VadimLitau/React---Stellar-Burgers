import React, { useEffect, useState } from "react";
import { useAuth } from "../../services/auth";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/utils";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const location = useLocation();

  // const stateUser = useSelector((store) => store.route.userAuthProfile);
  // console.log(stateUser);
  // const loco = locations.state.background
  //console.log(locations.state.background);
  //console.log(rest);
  // const state = useSelector((store) => store);
  // const cookie = getCookie("token");
  let { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    //console.log("kurwa");
    init();
  }, []);
  if (!isUserLoaded) {
    return null;
  }
  // const from = location.state?.from?.pathname;
  // console.log(auth.user);
  // // console.log(iaAuth);
  // if (auth.user) {
  //   // ...то отправляем его, например, на главную
  //   return <Redirect to={from ? from : "/"} />;
  // }
  // if (!auth.user) {
  //   // ...то отправляем его, например, на форму входа
  //   return <Redirect to="/login" state={{ from: location }} />;
  // }
  // return <Route {...rest}>{children}</Route>;
  // console.log(auth);
  //console.log(locations?.state?.background);
  return (
    <Route
      {...rest}
      render={() =>
        auth.user.name ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
