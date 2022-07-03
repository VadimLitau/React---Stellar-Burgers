import { baseUrl } from './constants'

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
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            "email": userEmail,
            "password": userPassword
        })
    })

}