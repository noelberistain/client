import axios from "axios";
import {socket} from "./sockets";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    ADD_FRIEND,
    GET_FRIENDS,
    CONTACTS_LOADING,
    GET_CONVERSATION_ID,
    ADD_GROUP_CONTACT,
    REMOVE_GROUP_CONTACT,
    ADD_NAME_GROUP,
    RESTORE_DEFAULT,
    GET_GROUPS
} from "./types";
import setAuthToken from "../setAuthToken";
import { delete_cookie } from "sfcookies";

export const registerUser = (user, history) => dispatch => {
    axios
    .post("/api/auth/register", user)
    .then(res => {
        const { _id, email } = res.data;
        const user = { _id, email };
        sendUser(user);
        history.push("/");
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    });
};

const sendUser = newUser => {
    axios.post("/api/notification/adduser", newUser);
};

export const loginUser = (user, history) => async dispatch => {
    // const getData = () => axios.post("/api/auth/login",user);
    // const response = await getData();
    // dispatch(setCurrentUser(response.data))
    // socket.open()
    // history.push("/home")
    
    axios
    .post("/api/auth/login", user)
    .then(res => {
        dispatch(setCurrentUser(res.data));
        history.push("/home");
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const setCurrentUser = info => {
    return {
        type: SET_CURRENT_USER,
        payload: info.success
    };
};

export const validatingUser = email => {
    //validate an user into auth service
    return axios.get("/api/auth/validatingUser", { params: { email } });
};

export const getFriends = () => async dispatch => {
    dispatch(setContactsLoading());
    const getData = () => axios.get("/api/notification/myfriends");
    const friends = await getData();
    dispatch({
        type: GET_FRIENDS,
        payload: friends.data
    });
};

export const responseFriendship = data => async dispatch => {
    const newConversation = () => axios.post("/api/notification/responseFriendship", data)
    await newConversation()
}

export const getConversation = contact => async dispatch => {
    const req4Conv = () => axios.get("/api/notification/getConversation")
    const response = await req4Conv()
    const twoParticipants = response.data.filter(conversation => conversation.participants.length === 2);
    const theOne = twoParticipants.filter(participant => participant.participants.includes(contact))
    const {_id} = theOne[0]
    const payload = { _id , contact};
    
    getMessages(_id,contact)
    dispatch({
        type: GET_CONVERSATION_ID,
        payload: payload
    })
}

export const createMessage = (convID,content,contact) => {
    axios.post("/api/notification/createMessage", {convID,content,contact});
};

export const getMessages = async (id,contact) => {
    const getAll = () => axios.get("api/notification/getMessages", {params:{id,contact}})
    const messages = await getAll()
	console.log("TCL: messages", messages.data)
}

export const setContactsLoading = () => {
    return {
        type: CONTACTS_LOADING
    };
};

export const addFriend = info => async dispatch => {
    const sendFriend = () =>
        axios.post("/api/notification/addContact", info.data);
    const newFriend = await sendFriend(); // NEW FRIEND represents user object at notification DB
    const { contacts } = newFriend.data; // user id and contacts array with friend's ids and status
    // user contacts array
    contacts.forEach(value => {
        if (value.contactID === info.data._id) info.data.status = value.status;
    });

    let { userId, ...fullFriend } = info.data;
    dispatch({
        type: ADD_FRIEND,
        payload: fullFriend
    });
};

export const logoutUser = history => dispatch => {
    delete_cookie("jwToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push("/");
    socket.close()
};

export const addToGroup = id => dispatch=> {    
    dispatch({
        type: ADD_GROUP_CONTACT,
        payload: id
    })
}

export const removeFromGroup = id => dispatch => {
    dispatch({
        type: REMOVE_GROUP_CONTACT,
        payload: id
    })
}

export const setNameGroup = name => dispatch => {    
    dispatch({
        type: ADD_NAME_GROUP,
        payload: name
    })
}

export const createGroupConversation = (name, list) => {
    axios.post("/api/notification/createGroup", {name,list})
	// console.log("TCL: response.data", response.data)
    // dispatch(reset())
}

export const reset = () => dispatch =>{
    dispatch({
        type: RESTORE_DEFAULT
    })
}

export const getGroups = () => async dispatch => {
    const sendRequest = () => axios.get("/api/notification/getGroups");
    const response = await sendRequest();
    const groups = response.data.filter(conversation => conversation.participants.length > 2);
    const theOnes = groups.filter(conv => conv.groupName)
    dispatch({
        type:GET_GROUPS,
        payload: theOnes
    })
}