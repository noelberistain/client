import io from "socket.io-client";
import { getFriends, getConversation } from "./authentication";
import { CREATE_CONVERSATION, GET_CONVERSATION_ID, GET_MESSAGES, NEW_MESSAGE } from "./types";
// import { GET_FRIENDS } from "./types";

// export const socket = io({autoConnect:false},{transports:['websocket']});
//  W O R K S with the PATH flag
export const socket = io({ path: "/io", autoConnect: false },{transports:['websocket']});

export function initSocket(dispatch) {

    socket.on('connect', () => {
        console.log('Connected');
    })

    socket.on("notification", (data) => {
        if(data ) console.log("NOTIFICATION FROM = ", data)
        dispatch(getFriends())
    })

    socket.on('create_conversation', data =>{
        dispatch({
            type: CREATE_CONVERSATION,
            payload: data
        })
        dispatch(getFriends())
    })  

    socket.on('get_conversation_id', id => {
        dispatch(getConversation())
        dispatch({
            type: GET_CONVERSATION_ID,
            payload: id
        })
    })

    socket.on("newMessage",data =>{
		console.log("TCL: initSocket -> data", data)
        dispatch({
            type: NEW_MESSAGE,
            payload: data
        })
    })

    socket.on('getMessages',(messages)=>{
        dispatch({
            type: GET_MESSAGES,
            payload: messages
        })
    })

    socket.on('disconnect', () => {
        console.log('Disconnected')
    })
};