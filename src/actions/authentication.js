import axios from "axios";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    ADD_FRIEND,
    GET_FRIENDS,
    CONTACTS_LOADING
} from "./types";
import setAuthToken from "../setAuthToken";
import jwt_decode from "jwt-decode";
import { bake_cookie, delete_cookie } from "sfcookies";

export const registerUser = (user, history) => dispatch => {
    axios
        .post("/api/auth/register", user)
        .then(res => {
            const { _id, name, email } = res.data;
            const user = { _id, name, email };
            console.log("user", user);
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

export const loginUser = (user, history) => dispatch => {
    axios
        .post("/api/auth/login", user)
        .then(res => {
            const { token } = res.data;
            bake_cookie("jwToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            history.push("/home");
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const setCurrentUser = userInfo => {
    return {
        type: SET_CURRENT_USER,
        payload: userInfo
    };
};

export const validatingUser = email => {
    //validate an user into auth service

    return axios.get("/api/auth/validatingUser", { params: { email } });
};

export const getFriends = () => async dispatch => {
    dispatch(setContactsLoading());
    const getData = () => axios.get("/api/notification/myfriends");
    const friends = await getData()

    console.log(" ALL OF THEM - - - -- - - - -\n", friends.data)

    dispatch({
        type: GET_FRIENDS,
        payload: friends.data
    });

    //sending everything from here to auth to get the whole info together
};

export const setContactsLoading = () => {
    return {
        type: CONTACTS_LOADING
    };
};

export const addFriend = (info) => async dispatch => {

    const sendFriend = () => axios.post("/api/notification/addContact", info.data)
    const newFriend = await sendFriend()    // NEW FRIEND represents user object at notification DB
    const { contacts } = newFriend.data       // user id and contacts array with friend's ids and status
    //user contacts array
    contacts.forEach(value => {
        if (value.contactID == info.data._id)
            info.data.status = value.status
    })

    console.log("info with status", info.data)
    let { userId, ...fullFriend } = info.data

    dispatch({
        type: ADD_FRIEND,
        payload: fullFriend
    })
};

export const logoutUser = history => dispatch => {
    delete_cookie("jwToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push("/");
};
