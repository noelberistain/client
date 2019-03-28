import {combineReducers} from 'redux';

import errorReducer from './errorReducer';
import authReducer from './authReducer';
import contactsReducer from './contactsReducer';
import conversationReducer from './conversationReducer';
import messagesReducer from './messagesReducer';
import groupReducer from './groupReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    contacts: contactsReducer,
    conversations: conversationReducer,
    messages : messagesReducer,
    group: groupReducer
});