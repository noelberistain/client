import io from "socket.io-client";
import { ADD_FRIEND } from "./types";

// export const socket = io({autoConnect:false},{transports:['websocket']});
//  W O R K S with the PATH flag
export const socket = io({ path: "/io", autoConnect: false }, { transports: ['websocket'] });

export function initSocket(dispatch) {

    // console.log('TCL: initSocket -> dispatch', dispatch)

    socket.on('connect', () => {
        console.log('Connected');
    })

    socket.on("notification", data => {
        let { userId, ...fullFriend } = data;
        console.log("NOTIFICATION FROM = ", userId)
        // console.log('TCL: userId, ...fullFriend', userId, fullFriend)
        dispatch({
            type: ADD_FRIEND,
            payload: fullFriend
        })
    })

    socket.on('disconnect', () => {
        console.log('Disconnected')
    })
};