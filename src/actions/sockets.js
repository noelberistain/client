import io from "socket.io-client";
import { getFriends } from "./authentication";
import { CREATE_CONVERSATION } from "./types";
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

        console.log(data)
        dispatch({
            type: CREATE_CONVERSATION,
            payload: data
        })
        dispatch(getFriends())
    })

    socket.on('newMessage',(data)=>{
        console.log(data.id) //should be room id
        console.log(data.user) // should be active user id
        console.log(data.contact) // should be contact id
    })

    socket.on('disconnect', () => {
        console.log('Disconnected')
    })
};