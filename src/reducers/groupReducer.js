import {
    ADD_GROUP_CONTACT,
    REMOVE_GROUP_CONTACT,
    ADD_NAME_GROUP,
    RESTORE_DEFAULT,
    CREATE_GROUP,
    GET_GROUPS,
    GET_GROUP_MESSAGES,
    NOTHING
} from "../actions/types";

const initialState = {
    groupName: "Group Name",
    groupContacts: [],
    allGroups: [],
    groupMessages:''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_GROUP_CONTACT:
            return {
                ...state,
                groupContacts: [...state.groupContacts, action.payload]
            };
        case REMOVE_GROUP_CONTACT:
            return {
                ...state,
                groupContacts: [...state.groupContacts].filter(
                    item => item !== action.payload
                )
            };
        case ADD_NAME_GROUP:
            return {
                ...state,
                groupName: action.payload
            };
        case CREATE_GROUP:
            return {
                ...state,
                allGroups: [...state.allGroups, action.payload]
            };
        case RESTORE_DEFAULT:
            return {
                ...state,
                groupContacts: initialState.groupContacts,
                groupName: initialState.groupName
            };
        case GET_GROUPS:
            return {
                ...state,
                allGroups: action.payload
                // allGroups: [...state.allGroups, action.payload]
            };
        case GET_GROUP_MESSAGES:
            return {
                ...state,
                groupMessages: action.payload
            }
        case NOTHING:
            console.log("NADAAAAAA")
            return {

            }
        default:
            return state;
    }
}
