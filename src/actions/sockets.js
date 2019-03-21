import io from "socket.io-client";
import { getFriends } from "./authentication";
// import { GET_FRIENDS } from "./types";

// export const socket = io({autoConnect:false},{transports:['websocket']});
//  W O R K S with the PATH flag
export const socket = io({ path: "/io", autoConnect: false }, { transports: ['websocket'] });

export function initSocket(dispatch) {

    let fire = dispatch;

    socket.on('connect', () => {
        console.log('Connected');
    })

    socket.on("notification", (data) => {
        console.log("NOTIFICATION FROM = ", data)
        fire(getFriends())
    })

    socket.on('disconnect', () => {
        console.log('Disconnected')
    })
};