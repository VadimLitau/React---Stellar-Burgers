import { USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAILED, USER_FORGOT_SUCCESS, USER_FORGOT_REQUEST, USER_FORGOT_FAILED, USER_AUTHORIZATION_SUCCESS, USER_AUTHORIZATION_REQUEST, USER_AUTHORIZATION_FAILED, USER_LOGOUT } from '../actions/route';

export const routeState = {
    userRegistrationSuccess: false,
    userRegistrationRequest: false,
    userRegistrationFailed: false,
    userForgotPasswordSuccess: false,
    userForgotPasswordRequest: false,
    userForgotPasswordFailed: false,
    userAuthorizationRequest: false,
    userAuthorizationSuccess: false,
    userAuthorizationFailed: false,
    userAuth: false,
    userAuthProfile: { name: '', email: '', password: '' },
    newUserProfile: null,
}

export const routeReducer = (state = routeState, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            {
                return {...state,
                    userRegistrationRequest: true
                }
            }
        case USER_REGISTER_SUCCESS:
            {
                return {...state,
                    userRegistrationRequest: false,
                    userRegistrationSuccess: true,
                    newUserProfile: { name: action.data.user.name, email: action.data.user.email }
                }
            }
        case USER_REGISTER_FAILED:
            {
                return {...state,
                    userRegistrationRequest: false,
                    userRegistrationFailed: true
                }
            }
        case USER_FORGOT_REQUEST:
            {
                return {...state,
                    userForgotPasswordRequest: true
                }
            }
        case USER_FORGOT_SUCCESS:
            {
                return {...state,
                    userForgotPasswordSuccess: true,
                    userForgotPasswordRequest: false
                }
            }
        case USER_FORGOT_FAILED:
            {
                return {...state,
                    userForgotPasswordRequest: false,
                    userForgotPasswordFailed: true
                }
            }
        case USER_AUTHORIZATION_REQUEST:
            {
                return {...state,
                    userAuthorizationRequest: true,
                    userAuth: false
                }
            }
        case USER_AUTHORIZATION_SUCCESS:
            {
                const { email, name, password } = action.payload;
                return {...state,
                    userAuthorizationRequest: false,
                    userAuthorizationSuccess: true,
                    userAuth: true,
                    userAuthProfile: {...state.user,
                        email: email,
                        name: name
                    }
                }
            }
        case USER_AUTHORIZATION_FAILED:
            {
                return {...state,
                    userAuthorizationRequest: false,
                    userAuthorizationFailed: true,
                    userAuth: false
                }
            }
        case USER_LOGOUT:
            {
                return {
                    ...state,
                    userAuthorizationSuccess: false,
                    userAuth: false,
                    userAuthProfile: {
                        name: '',
                        email: ''
                    }
                };
            }
        default:
            {
                return state;
            }
    }
}