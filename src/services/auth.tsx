import React, { ReactNode, FC } from "react";
import { useContext, createContext } from "react";
import { userAuthorization, getUserDate, signOutUser } from "./actions/route";
import { useDispatch, useSelector } from "../services/hooks";

const AuthContext: any = createContext(undefined);
interface IProvideAuth {
  children: ReactNode;
}

export const ProvideAuth: FC<IProvideAuth> = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export function useAuth(): any {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const dispatch = useDispatch();
  const user = useSelector((store) => {
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
