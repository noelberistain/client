import {
    CREATE_CONVERSATION, 
    GET_CONVERSATION_ID
} from "../actions/types";

const initialState = {
    conversations:[],
    conversationID: ''
}

export default function (state = initialState, action) {
    switch (action.type) {

        case CREATE_CONVERSATION:
            return {
                ...state,
                conversations: [...state.conversations, action.payload]
            }
        case GET_CONVERSATION_ID:
        return {
                ...state,
                conversationID: action.payload
            }
        default:
            return state;
    }
}