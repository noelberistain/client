import {combineReducers} from 'redux';

import errorReducer from './errorReducer';
import authReducer from './authReducer';
import contactsReducer from './contactsReducer';
import conversationReducer from './conversationReducer';
import messagesReducer from './messagesReducer';
import groupReducer from './groupReducer';
import locale from './localeReducer';

const appReducer = combineReducers({
    errors: errorReducer,
    auth: authReducer,
    contacts: contactsReducer,
    conversations: conversationReducer,
    messages : messagesReducer,
    group: groupReducer,
    locale: locale
});

export default (state, action) =>{
    if(action.type === 'USER_LOGOUT')
        state = undefined
    return appReducer(state,action)
}