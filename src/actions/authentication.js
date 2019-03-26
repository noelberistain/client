import axios from "axios";
import {socket} from "./sockets";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    ADD_FRIEND,
    GET_FRIENDS,
    CONTACTS_LOADING,
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

export const getConversation = async contact => {
    const req4Conv = () => axios.get("/api/notification/getConversation",{params:{contact}})
    const convID = await req4Conv()
    return convID;
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
