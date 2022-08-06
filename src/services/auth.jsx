import React from "react";
import { useContext, createContext } from "react";
import { userAuthorization, getUserDate, signOutUser } from "./actions/route";
import { useDispatch, useSelector } from "react-redux";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const dispatch = useDispatch();
  const user = useSelector((store) => {
    return store.route.userAuthProfile;
  });

  const getUser = () => dispatch(getUserDate(user));
  const signIn = (userEmail, userPassword) =>
    dispatch(userAuthorization(userEmail, userPassword));
  const signOut = (token) => dispatch(signOutUser(token));

  return {
    user,
    signIn,
    getUser,
    signOut,
  };
}
