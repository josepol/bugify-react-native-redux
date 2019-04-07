import {LIST_BUGS} from './bugs.constants';

const initialState = {
    bugs: [],
}

const bugsReducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case LIST_BUGS:
            return {
                ...state,
                bugs: action.payload
            }
        default:
            return state
    }
}

export default bugsReducer;