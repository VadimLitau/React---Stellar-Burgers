import React, { useEffect, useState, FC } from "react";
import { useAuth } from "../../services/auth";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";

export const ProtectedRoute: FC<RouteProps & { children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
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
};
