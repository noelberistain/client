import {
    ADD_FRIEND,
    GET_FRIENDS,
    DELETE_FRIEND,
    CONTACTS_LOADING
} from "../actions/types";

const initialState = {
    contacts: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_FRIEND:
        console.log(action.payload)
            return {
                ...state,
                contacts: [...state.contacts,action.payload]
                }
        case GET_FRIENDS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            };
        case CONTACTS_LOADING:
            return {
                ...state,
                loading: true
            };
        case DELETE_FRIEND:
            return action.payload;
        default:
            return state;
    }
}
