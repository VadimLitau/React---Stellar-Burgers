import { getResetPass, getUserRegister, getForgotPass, getUserAuthorization, getUserRequest, apdateTokenRequest } from '../../utils/Api';
import { checkResponse } from '../../utils/constants';
import { setCookie } from '../../utils/utils'

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
                let accessToken = data.accessToken.split('Bearer ')[1]
                setCookie('accessToken', accessToken)
                localStorage.setItem("refreshToken", data.refreshToken);
                //console.log(localStorage)
                dispatch({
                    type: USER_AUTHORIZATION_SUCCESS,
                    data
                });
            })
            .catch((err) => {
                dispatch({
                    type: USER_AUTHORIZATION_FAILED
                });
            })
    }
}

export function userLogin(userEmail, userPassword) {
    return function(dispatch) {
        const data = userAuthorization(userEmail, userPassword)
            .then(res => {
                let authToken;
                res.headers.forEach(header => {
                    if (header.indexOf('Bearer') === 0) {
                        authToken = header.split('Bearer ')[1];
                    }
                });
                if (authToken) {
                    setCookie('token', authToken);
                }

                return res.json();
            })
            .then(data => data);
        console.log(data);

        if (data.success) {
            dispatch({
                type: USER_AUTHORIZATION_SUCCESS,
                data
            });

        }
    }


}

export function logoutRequest() {}

export function getUserDate(user) {
    return function(dispatch) {
        getUserRequest()
            .then(checkResponse)
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: USER_AUTHORIZATION_SUCCESS,
                        payload: { password: localStorage.getItem('password'), ...data.user }

                    })

                    console.log(localStorage)
                }
                return data.success;
            })
            .catch(e => {
                if (user) {
                    console.log(user.name)
                    const data = apdateTokenRequest()
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
                            console.log(e.type);
                        })
                }
                console.log(e.type);
            })
    }
}