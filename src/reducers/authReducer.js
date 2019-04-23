// auth Reducer

import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    user:{}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
        console.log(action.payload.success)
        console.log(action.payload.user)
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload.success),
                user: action.payload.user
            }
        default:
            return state;
    }
}