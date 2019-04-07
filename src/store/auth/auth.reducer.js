import * as axios from 'axios';
import { LOGIN, REGISTER, LOGIN_ERROR, REGISTER_ERROR, RESET_LOGIN } from './auth.constants';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    token: undefined,
    status: ''
}

const setAuthTokenAndHeader = (action) => {
    AsyncStorage.setItem('token', `bearer ${action.payload}`)
    axios.defaults.headers.common['authorization'] = AsyncStorage.getItem('token')
}

const authReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN:
        setAuthTokenAndHeader(action)
        return {
            ...state,
            token: action.payload
        }
        case REGISTER:
        setAuthTokenAndHeader(action)
        return {
            ...state,
            status: action.payload
        }
        case LOGIN_ERROR:
        return {
            ...state,
            token: false
        }
        case REGISTER_ERROR: 
        return {
            ...state,
            status: false
        }
        case RESET_LOGIN:
        return {
            ...state,
            token: undefined
        }
        default:
        return state
    }
}

export default authReducer;