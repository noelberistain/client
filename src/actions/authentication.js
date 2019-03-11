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

export const getInfo = () => {
    // getting all info from users
    return axios.get("/api/notification/allUsers");
};

export const getFriends = () => dispatch => {
    dispatch(setContactsLoading());
    const getData = () => axios.get("/api/notification/myfriends");
    const getInfo = (element) => axios.get("/api/auth/friendsInfo",{params: element})

    const friends = async () => {
        let aot=[]
        let friends = await getData();
        for (let index = 0; index < friends.data.length; index++) {
            const element = friends.data[index];
            const fullFriend = await getInfo(element)
            aot.push(fullFriend.data)
        }

        console.log(" ALL OF THEM - - - -- - - - -\n",aot)
        dispatch({
            type: GET_FRIENDS,
            payload: aot
        });
    };
    friends();
    //sending everything from here to auth to get the whole info together
};

export const setContactsLoading = () => {
    return {
        type: CONTACTS_LOADING
    };
};

export const addFriend = info => {
    axios.post("/api/notification/addContact", info);
};

export const logoutUser = history => dispatch => {
    delete_cookie("jwToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push("/");
};
