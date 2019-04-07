import { LOGIN, LOGIN_ERROR, RESET_LOGIN, REGISTER, REGISTER_ERROR } from './auth.constants'

export const loginAction = payload => {
    return {
        type: LOGIN,
        payload
    }
}

export const loginErrorAction = () => {
    return {
        type: LOGIN_ERROR
    }
}

export const resetLoginAction = () => {
    return {
        type: RESET_LOGIN
    }
}

export const registerAction = payload => {
    return {
        type: REGISTER,
        payload
    }
}

export const registerErrorAction = payload => {
    return {
        type: REGISTER_ERROR,
        payload
    }
}