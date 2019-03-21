import React from 'react';

import {responseFriendship} from "../../actions/authentication"
import {pendingFriend, rejectFriend,friend} from "./friendButtonStyle"

export default function Button(props) {

    const { status, id } = props;
    const requestingID = id;
    const handleSubmit = e => {
        e.preventDefault();
        const {value} = e.target;
        responseFriendship({value,requestingID});
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