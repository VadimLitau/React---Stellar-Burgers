import { getResetPass, getUserRegister, getForgotPass, getUserAuthorization, getUserRequest, updateUserTokenRequest, logoutRequest, updateUserDataRequest } from '../../utils/Api';
import { checkResponse } from '../../utils/constants';
import { setCookie, deleteCookie } from '../../utils/utils'

export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED';

export const USER_FORGOT_SUCCESS = 'USER_FORGOT_SUCCESS';
export const USER_FORGOT_REQUEST = 'USER_FORGOT_REQUEST';
export const USER_FORGOT_FAILED = 'USER_FORGOT_FAILED';

export const USER_RESETPASSWORD_SUCCESS = "USER_RESETPASSWORD_SUCCESS";
export const USER_RESETPASSWORD_REQUEST = 'USER_RESETPASSWORD_REQUEST';
export const USER_RESETPASSWORD_FAILED = 'USER_RESETPASSWORD_FAILED';

export const USER_AUTHORIZATION_SUCCESS = 'USER_AUTHORIZATION_SUCCESS';
export const USER_AUTHORIZATION_REQUEST = 'USER_AUTHORIZATION_REQUEST';
export const USER_AUTHORIZATION_FAILED = 'USER_AUTHORIZATION_FAILED';


export const USER_LOGOUT = 'USER_LOGOUT';

export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';



export function userRegister(userName, userEmail, userPassword) {
    return function(dispatch) {
        dispatch({
            type: USER_REGISTER_REQUEST
        });
        getUserRegister(userName, userEmail, userPassword).then(checkResponse)
            .then((data) => {
                dispatch({
                    type: USER_REGISTER_SUCCESS,
                    data,
                });
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: USER_REGISTER_FAILED
                });
            })
    }
}

export function userForgotPass(userEmail) {
    return function(dispatch) {
        dispatch({
            type: USER_FORGOT_REQUEST
        });
        getForgotPass(userEmail).then(checkResponse)
            .then((data) => {
                dispatch({
                    type: USER_FORGOT_SUCCESS,
                    data
                });
            })
            .catch((err) => {
                dispatch({
                    type: USER_FORGOT_FAILED
                });
            })
    }
}

export function userResetPass(resetToken, resetPass) {
    return function(dispatch) {
        dispatch({
            type: USER_RESETPASSWORD_REQUEST
        });
        getResetPass(resetToken, resetPass).then(checkResponse)
            .then((data) => {
                dispatch({
                    type: USER_RESETPASSWORD_SUCCESS,
                    data
                });
            })
            .catch((err) => {
                dispatch({
                    type: USER_RESETPASSWORD_FAILED
                });
            })
    }
}
export function userAuthorization(userEmail, usePass) {
    return function(dispatch) {
        dispatch({
            type: USER_AUTHORIZATION_REQUEST
        });
        getUserAuthorization(userEmail, usePass).then(checkResponse)
            .then((data) => {
                let authToken;
                if (data.accessToken && data.accessToken.indexOf('Bearer') === 0) {
                    authToken = data.accessToken.split('Bearer ')[1];
                }
                if (authToken) {
                    //console.log(data.refreshToken);
                    setCookie('token', authToken, 0);
                    localStorage.setItem('refreshToken', `${data.refreshToken}`);
                    //localStorage.setItem('token', `${authToken}`);
                }
                if (data.success) {
                    //console.log(data);
                    dispatch({
                        type: USER_AUTHORIZATION_SUCCESS,
                        payload: { userEmail, usePass, ...data.user }
                    })
                    localStorage.setItem('password', `${usePass}`);
                }
            })
            .catch(e => {
                console.log(e.type);

            })
    }
}

export function signOutUser(token) {

    return function(dispatch) {
        //console.log(token)
        logoutRequest(token)
            .then(checkResponse)
            .then(data => data)
            .catch(e => {
                console.log(e.type);
            })
        dispatch({
            type: USER_LOGOUT
        })
        deleteCookie('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('password');
    }
}

export function getUserDate(user) {
    return function(dispatch) {
        getUserRequest()
            .then(checkResponse)
            .then(data => {
                //console.log(data)
                if (data.success) {
                    //console.log("data.success")
                    //console.log(localStorage)
                    dispatch({
                        type: USER_AUTHORIZATION_SUCCESS,
                        payload: { password: localStorage.getItem('password'), ...data.user }
                    })
                }
                return data.success;
            })
            .catch(e => {
                if (user) {
                    //console.log(user)
                    const data = updateUserTokenRequest()
                        .then(checkResponse)
                        .then(data => {
                            let authToken;
                            if (data.accessToken && data.accessToken.indexOf('Bearer') === 0) {
                                authToken = data.accessToken.split('Bearer ')[1];
                            }
                            if (authToken) {
                                setCookie('token', authToken, 0);
                                localStorage.setItem('refreshToken', `${data.refreshToken}`);
                                console.log('Token обновлен')
                            }
                        })
                        .catch(e => {
                            //console.log(e.type);
                        })
                }
                //console.log(e.type);
            })
    }
}

export function updateUserProfile(email, password, name) {
    return function(dispatch) {
        updateUserDataRequest(email, password, name)
            .then(checkResponse)
            .then((res) => {
                if (res && res.success === true) {
                    dispatch({
                        type: UPDATE_USER_PROFILE,
                        payload: {...res.user, password: password },
                    });
                    localStorage.setItem("password", password);
                }
            })
            .catch((e) => {
                console.log(e.type);
            });
    }
}