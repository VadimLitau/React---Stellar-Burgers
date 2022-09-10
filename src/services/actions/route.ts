import {
  getResetPass,
  getUserRegister,
  getForgotPass,
  getUserAuthorization,
  getUserRequest,
  updateUserTokenRequest,
  logoutRequest,
  updateUserDataRequest,
} from "../../utils/Api";
import { checkResponse } from "../../utils/constants";
import { setCookie, deleteCookie } from "../../utils/utils";
import {
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAILED,
  USER_FORGOT_SUCCESS,
  USER_FORGOT_REQUEST,
  USER_FORGOT_FAILED,
  USER_RESETPASSWORD_SUCCESS,
  USER_RESETPASSWORD_REQUEST,
  USER_RESETPASSWORD_FAILED,
  USER_AUTHORIZATION_SUCCESS,
  USER_AUTHORIZATION_REQUEST,
  USER_AUTHORIZATION_FAILED,
  USER_LOGOUT,
  UPDATE_USER_PROFILE,
} from "../constants/route";
import { AppDispatch, AppThunk } from "../types";

export interface IUserRegisterSucces {
  readonly type: typeof USER_REGISTER_SUCCESS;
  readonly data: any;
}
export interface IUserRegisterRequest {
  readonly type: typeof USER_REGISTER_REQUEST;
}
export interface IUserRegisterFailed {
  readonly type: typeof USER_REGISTER_FAILED;
}
export interface IUserForgotSucces {
  readonly type: typeof USER_FORGOT_SUCCESS;
  readonly data: any;
}
export interface IUserForgotRequest {
  readonly type: typeof USER_FORGOT_REQUEST;
}
export interface IUserForgotRFailed {
  readonly type: typeof USER_FORGOT_FAILED;
}
export interface IUserResetPasswordRequest {
  readonly type: typeof USER_RESETPASSWORD_REQUEST;
}
export interface IUserResetPasswordSucces {
  readonly type: typeof USER_RESETPASSWORD_SUCCESS;
  readonly data: any;
}
export interface IUserResetPasswordFailed {
  readonly type: typeof USER_RESETPASSWORD_FAILED;
}
export interface IUserAuthorizationSucces {
  readonly type: typeof USER_AUTHORIZATION_SUCCESS;
  readonly payload: { email: string; password: string; name: string };
}
export interface IUserAuthorizationRequest {
  readonly type: typeof USER_AUTHORIZATION_REQUEST;
}
export interface IUserAuthorizationFailed {
  readonly type: typeof USER_AUTHORIZATION_FAILED;
}
export interface IUserLogout {
  readonly type: typeof USER_LOGOUT;
}
export interface IUpdateUserProfile {
  readonly type: typeof UPDATE_USER_PROFILE;
  readonly payload: { email: string; password: string; name: string };
}
export type TRouteActions =
  | IUserRegisterSucces
  | IUserRegisterRequest
  | IUserRegisterFailed
  | IUserForgotSucces
  | IUserForgotRequest
  | IUserForgotRFailed
  | IUserResetPasswordRequest
  | IUserResetPasswordSucces
  | IUserResetPasswordFailed
  | IUserAuthorizationSucces
  | IUserAuthorizationRequest
  | IUserAuthorizationFailed
  | IUserLogout
  | IUpdateUserProfile;

export const UserRegisterSucces = (data: any): IUserRegisterSucces => ({
  type: USER_REGISTER_SUCCESS,
  data,
});
export const UserRegisterRequest = (): IUserRegisterRequest => ({
  type: USER_REGISTER_REQUEST,
});
export const UserRegisterFailed = (): IUserRegisterFailed => ({
  type: USER_REGISTER_FAILED,
});
export const UserForgotSucces = (data: any): IUserForgotSucces => ({
  type: USER_FORGOT_SUCCESS,
  data,
});
export const UserForgotRequest = (): IUserForgotRequest => ({
  type: USER_FORGOT_REQUEST,
});
export const UserForgotRFailed = (): IUserForgotRFailed => ({
  type: USER_FORGOT_FAILED,
});
export const UserResetPasswordRequest = (): IUserResetPasswordRequest => ({
  type: USER_RESETPASSWORD_REQUEST,
});
export const UserResetPasswordSucces = (
  data: any
): IUserResetPasswordSucces => ({
  type: USER_RESETPASSWORD_SUCCESS,
  data,
});
export const UserResetPasswordFailed = (): IUserResetPasswordFailed => ({
  type: USER_RESETPASSWORD_FAILED,
});
export const UserAuthorizationSucces = (payload: {
  email: string;
  password: string;
  name: string;
}): IUserAuthorizationSucces => ({
  type: USER_AUTHORIZATION_SUCCESS,
  payload,
});
export const UserAuthorizationRequest = (): IUserAuthorizationRequest => ({
  type: USER_AUTHORIZATION_REQUEST,
});
export const UserAuthorizationFailed = (): IUserAuthorizationFailed => ({
  type: USER_AUTHORIZATION_FAILED,
});
export const UserLogout = (): IUserLogout => ({
  type: USER_LOGOUT,
});
export const UpdateUserProfile = (payload: {
  email: string;
  password: string;
  name: string;
}): IUpdateUserProfile => ({
  type: UPDATE_USER_PROFILE,
  payload,
});

export const userRegister: AppThunk = (
  userName: string,
  userEmail: string,
  userPassword: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch(UserRegisterRequest());
    getUserRegister(userName, userEmail, userPassword)
      .then(checkResponse)
      .then((data) => {
        dispatch(UserRegisterSucces(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(UserRegisterFailed());
      });
  };
};

export const userForgotPass: AppThunk = (userEmail: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(UserForgotRequest());
    getForgotPass(userEmail)
      .then(checkResponse)
      .then((data) => {
        dispatch(UserForgotSucces(data));
      })
      .catch((err) => {
        dispatch({
          type: USER_FORGOT_FAILED,
        });
      });
  };
};

export const userResetPass: AppThunk = (
  resetToken: string,
  resetPass: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch(UserResetPasswordRequest());
    getResetPass(resetToken, resetPass)
      .then(checkResponse)
      .then((data) => {
        dispatch(UserResetPasswordSucces(data));
      })
      .catch((err) => {
        dispatch(UserResetPasswordFailed());
      });
  };
};
export const userAuthorization: AppThunk = (
  userEmail: string,
  usePass: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch(UserAuthorizationRequest());
    getUserAuthorization(userEmail, usePass)
      .then(checkResponse)
      .then((data) => {
        let authToken;
        if (data.accessToken && data.accessToken.indexOf("Bearer") === 0) {
          authToken = data.accessToken.split("Bearer ")[1];
        }
        if (authToken) {
          //console.log(data.refreshToken);
          setCookie("token", authToken, 0);
          localStorage.setItem("refreshToken", `${data.refreshToken}`);
          //localStorage.setItem('token', `${authToken}`);
        }
        if (data.success) {
          // //console.log(data);
          dispatch({
            type: USER_AUTHORIZATION_SUCCESS,
            payload: { userEmail, usePass, ...data.user },
          });
          localStorage.setItem("password", `${usePass}`);
        }
      })
      .catch((e) => {
        console.log(e.type);
      });
  };
};

export const signOutUser: AppThunk = (token: string) => {
  return function (dispatch: AppDispatch) {
    //console.log(token)
    logoutRequest(token)
      .then(checkResponse)
      .then((data) => data)
      .catch((e) => {
        console.log(e.type);
      });
    dispatch({
      type: USER_LOGOUT,
    });
    deleteCookie("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("password");
  };
};

export const getUserDate: AppThunk = (user: any) => {
  return function (dispatch: AppDispatch) {
    getUserRequest()
      .then(checkResponse)
      .then((data) => {
        if (data.success) {
          dispatch({
            type: USER_AUTHORIZATION_SUCCESS,
            payload: {
              password: localStorage.getItem("password"),
              ...data.user,
            },
          });
        }
        return data.success;
      })
      .catch((e) => {
        if (user.name) {
          const data = updateUserTokenRequest()
            .then(checkResponse)
            .then((data) => {
              let authToken;
              if (
                data.accessToken &&
                data.accessToken.indexOf("Bearer") === 0
              ) {
                authToken = data.accessToken.split("Bearer ")[1];
              }
              if (authToken) {
                setCookie("token", authToken, 0);
                localStorage.setItem("refreshToken", `${data.refreshToken}`);
                console.log("Token обновлен");
              }
            })
            .catch((e) => {
              console.log(e.type);
            });
        }
        console.log(e.type);
      });
  };
};

export const updateUserProfile: AppThunk = (
  email: string,
  password: string,
  name: string
) => {
  return function (dispatch: AppDispatch) {
    updateUserDataRequest(email, password, name)
      .then(checkResponse)
      .then((res) => {
        if (res && res.success === true) {
          dispatch({
            type: UPDATE_USER_PROFILE,
            payload: { ...res.user, password: password },
          });
          localStorage.setItem("password", password);
        }
      })
      .catch((e) => {
        console.log(e.type);
      });
  };
};
