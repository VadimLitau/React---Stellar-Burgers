import React, { ReactNode, FC } from "react";
import { useContext, createContext } from "react";
import { userAuthorization, getUserDate, signOutUser } from "./actions/route";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./types";

const AuthContext: any = createContext(undefined);
interface IProvideAuth {
  children: ReactNode;
}

export const ProvideAuth: FC<IProvideAuth> = ({ children }) => {
  const auth = useProvideAuth();
  //console.log(AuthContext);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export function useAuth(): any {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => {
    return store.route.userAuthProfile;
  });

  const getUser = () => dispatch(getUserDate(user));
  const signIn = (userEmail: string, userPassword: string) =>
    dispatch(userAuthorization(userEmail, userPassword));
  const signOut = (token: string) => dispatch(signOutUser(token));

  return {
    user,
    signIn,
    getUser,
    signOut,
  };
}
