import { baseUrl } from './constants'
import { getCookie } from './utils'

export const getServOrderRequest = async(orderId) => {
    return await fetch(`${baseUrl}orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ ingredients: orderId })
    })
}

export const getBurgerDataRequest = async() => {
    return await fetch(`${baseUrl}ingredients`);
}

//forgot-password

export const getForgotPass = async(forgotEmail) => {
    return await fetch(`${baseUrl}password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ 'email': forgotEmail })
    })
}

//reset-password

export const getResetPass = async(resetToken, resetPass) => {
    return await fetch(`${baseUrl}password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ 'password': resetToken, 'token': resetPass })
    })
}

//Regitstration
export const getUserRegister = async(userName, userEmail, userPassword) => {
    return await fetch(`${baseUrl}auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            "email": userEmail,
            "password": userPassword,
            "name": userName
        })
    })
};

export const getUserAuthorization = async(userEmail, userPassword) => {
    return await fetch(`${baseUrl}auth/login`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            "email": userEmail,
            "password": userPassword
        })
    })

}


export const logoutRequest = async(token) => {
    //console.log(token)
    return await fetch(`${baseUrl}auth/logout`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ 'token': token })
    });
};

export const getUserRequest = async() => {
    return await fetch(`${baseUrl}auth/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
}

export const updateUserDataRequest = async(email, password, name) => {
    return await fetch(`${baseUrl}auth/user`, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        })
    });
}

export const updateUserTokenRequest = async() =>
    await fetch(`${baseUrl}auth/token`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: localStorage.getItem('refreshToken')
    });