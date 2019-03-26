import {combineReducers} from 'redux';

import errorReducer from './errorReducer';
import authReducer from './authReducer';
import contactsReducer from './contactsReducer';
import conversationReducer from './conversationReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    contacts: contactsReducer,
    conversations: conversationReducer
});