import { useEffect, useState, React } from "react";
import { Redirect, useLocation, Route } from "react-router-dom";
import { useSelector } from "react-redux";
export const ProtectedRoute = ({
  children,
  anonymus = true,
  reset = false,
}) => {
  const state = useSelector((store) => store);
  const { userAuth } = useSelector((store) => store.route);

  const location = useLocation();

  const from = location.state?.from.pathname;

  console.log(userAuth);

  return (
    <Route
      render={() => {
        userAuth ? <Redirect to="/" /> : <Redirect to="/login" />;
      }}
    />
  );
};
