import React from 'react';
import { Button, ButtonGroup } from "reactstrap"

import { responseFriendship } from "../../actions/authentication"

export default function (props) {
    
    const { status, id } = props;
    const contactID = id;
    const handleSubmit = e => {
        e.preventDefault();
        const { value } = e.target;
        responseFriendship({ value, contactID });
    };


    const startConversation = e =>{
        e.preventDefault();
        console.log("start conversation with = ", contactID)
    }

    return (
        <>
            {status === 'false' &&
                <ButtonGroup size="sm">
                    <Button disabled color="light">Pending</Button>
                    <Button disabled color="light">Friendship</Button>
                </ButtonGroup>
            }
            {
                status === 'pending' &&
                <ButtonGroup size="sm">
                    <Button value="true" color="info" onClick={handleSubmit}>Accept</Button>
                    <Button value="false" color="secondary" onClick={handleSubmit}>Reject</Button>
                </ButtonGroup>
            }
            {status === 'true' &&
                <ButtonGroup size="sm">
                    <Button color="info" onClick={startConversation}>Send Msg</Button>
                    <Button value="false" color="secondary" onClick={handleSubmit}>Unfriend</Button>
                </ButtonGroup>
            }
        </>
    )
}