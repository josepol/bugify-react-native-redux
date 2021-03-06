import * as axios from 'axios';
import { loginAction, loginErrorAction } from './auth.actions';

export const loginProvider = (loginData) => {
    return dispatch => axios.post(`http://apibuggify.polsastre.com/auth/login`, loginData)
    .then((response) => dispatch(loginAction(response.data.token)))
    .catch(error => dispatch(loginErrorAction()))
}

export const registerProvider = (registerData) => {
    return dispatch => axios.post(`http://apibuggify.polsastre.com/auth/register`, registerData)
    .then((response) => dispatch(registerAction(response.data.status)))
    .catch(error => dispatch(registerErrorAction()))
}