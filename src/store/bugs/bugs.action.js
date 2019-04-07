import {LIST_BUGS} from './bugs.constants';

export const listBugs = (payload) => {
    return {
        type: LIST_BUGS,
        payload
    }
}