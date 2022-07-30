import React,{ useCallback} from "react";
import { useContext, useState, createContext } from 'react';
import { userAuthorization,getUserDate,logoutRequest,signOutUser} from "./actions/route";
import { setCookie } from "../utils/utils";
import { useDispatch, useSelector } from 'react-redux';

// const fakeAuth = {
//   isAuthenticated: false,
//   signIn(cb) {
//     fakeAuth.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signOut(cb) {
//     fakeAuth.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  //console.log(auth);
  return <AuthContext.Provider value={auth}>
    {children}
  </AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  //const [users, setUser] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((store) => {
    return store.route.userAuthProfile
  });
  console.log(user)
  
  const getUser = () => dispatch(getUserDate(user));
const signIn = (userEmail, userPassword) => dispatch(userAuthorization(userEmail, userPassword))
const signOut = (token) => dispatch(signOutUser(token));



  // const signIn = async (userEmail, userPassword) => {
  //   const data = await userAuthorization(userEmail, userPassword)
  //   .then(res => {
  //     let authToken;
  //     res.headers.forEach(header => {
  //       if (header.indexOf('Bearer') === 0) {
  //         authToken = header.split('Bearer ')[1];
  //       }
  //     });
  //     if (authToken) {
  //       setCookie('token', authToken);
  //     }
  //     return res.json();
  //   })
  //     .then(data => data);
  //     console.log(data);

  //   if (data.success) {
  //     //setUser({ ...data.user, id: data.user._id });
      
  //   }
  //   console.log(user);
  // };

  // const signOut = cb => {
  //   return fakeAuth.signOut(() => {
  //     //setUser(null);
  //     cb();
  //   });
  // };

  // const signOut =async()=>{
  //   await logoutRequest()
  // }
  return {
    user,
    signIn,
    getUser,
    signOut
  };
}