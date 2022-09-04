import React, { useEffect, useState } from "react";
import { useAuth } from "../../services/auth";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/utils";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const location = useLocation();
  let { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

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
