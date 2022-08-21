import React, { useEffect, useState } from "react";
import { useAuth } from "../../services/auth";
import { Redirect, Route } from "react-router-dom";
import { getCookie } from "../../utils/utils";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  //console.log(rest);
  // const state = useSelector((store) => store);
  // const cookie = getCookie("token");
  let { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);
  //console.log(auth)
  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }
  // console.log(iaAuth);
  // if (anonymous && iaAuth) {
  //   // ...то отправляем его, например, на главную
  //   return <Redirect to="/" />;
  // }
  // if (!anonymous && !iaAuth) {
  //   // ...то отправляем его, например, на форму входа
  //   return <Redirect to="/login" />;
  // }
  // return <Route {...rest}>{children}</Route>;
  //console.log(auth.user.name);
  return (
    <Route
      {...rest}
      render={({ location }) =>
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
