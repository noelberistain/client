import React from 'react';
import {pendingFriend, rejectFriend,friend} from "./friendButtonStyle"

export default function Button(props) {

    const { status } = props;

    const handleSubmit = e => {
        e.preventDefault();
        console.log("Pressed button", e.target.value)
    };

    

    return (
        <>
            {status === 'false' && <span style={pendingFriend}>Pending</span>}
            {
                status === 'pending' && <>
                <button value="true" style={pendingFriend} onClick={handleSubmit}>{status}</button>
                <button value="false" style={rejectFriend} onClick={handleSubmit}>Reject</button>
                </>
            }
            {status === 'true' && <button style={friend} onClick={handleSubmit}>Unfriend</button>}
        </>
    )
}