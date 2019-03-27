import React from 'react';
import { Button, ButtonGroup } from "reactstrap"
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import { responseFriendship, getConversation } from "../../actions/authentication"

function FriendButton (props) {
    
    const { status, id } = props;
    const contactID = id;
    const handleSubmit = e => {
        e.preventDefault();
        const { value } = e.target;
        props.responseFriendship({ value, contactID });
    };

    function startConversation (e){
        e.preventDefault();
        props.getConversation(contactID);
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
                    <Button value="false" color="light" onClick={handleSubmit}>Unfriend</Button>
                </ButtonGroup>
            }
        </>
    )
}

FriendButton.propTypes ={
    responseFriendship: PropTypes.func.isRequired,
    conversations: PropTypes.object.isRequired,
    // conversationID: PropTypes.string
}

export default connect(state =>({conversations: state.conversations}),{getConversation, responseFriendship})(FriendButton);