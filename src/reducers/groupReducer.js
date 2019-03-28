
import { ADD_GROUP_CONTACT } from '../actions/types';

const initialState = {
    groupContacts: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_GROUP_CONTACT:
            return {
                ...state,
                groupContacts: [...state.groupContacts, action.payload]
            }
        default:
            return state;
    }
}