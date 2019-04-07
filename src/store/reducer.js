import {combineReducers} from 'redux'
import bugs from './bugs/bugs.reducer';
import auth from './auth/auth.reducer';
// import {reducer as formReducer} from 'redux-form'

export default combineReducers({
    auth,
    bugs
})