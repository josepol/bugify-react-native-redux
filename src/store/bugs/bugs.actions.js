import {LIST_BUGS, LIST_BUGS_ERROR} from './bugs.constants';

export const listBugs = (payload) => {
    return {
        type: LIST_BUGS,
        payload
    }
}

export const listBugsError = (error) => {
    return {
        type: LIST_BUGS_ERROR
    }
}