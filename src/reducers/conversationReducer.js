import {
    CREATE_CONVERSATION
} from "../actions/types";

const initialState = {
    conversations:[]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_CONVERSATION:
            return {
                ...state,
                conversations: [...state.conversations, action.payload._id]
            }
        default:
            return state;
    }
}