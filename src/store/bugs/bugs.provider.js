import * as axios from 'axios';
import {listBugs, listBugsError} from './bugs.actions';

export function listBugsProvider(token) {
    return dispatch => axios.get(`http://apibuggify.polsastre.com/bug/listAll`, {
        headers: {
            authorization: token
        }
    })
    .then(response => dispatch(listBugs(response.data)))
    .catch(error => dispatch(listBugsError(error)));
}