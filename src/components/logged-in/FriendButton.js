import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
    responseFriendship,
    getConversation
} from "../../actions/authentication";
import { FormattedMessage } from "react-intl";

function FriendButton(props) {
    const { status, id } = props;
    const contactID = id;

    const handleSubmit = e => {
        e.preventDefault();
        const { value } = e.target;
		console.log("TCL: FriendButton -> value", value)
        props.responseFriendship({ value, contactID });
    };

    function startConversation(e) {
        e.preventDefault();
        props.getConversation(contactID);
    }

    return (
        <>
            {status === "false" && (
                <ButtonGroup size='sm'>
                    <FormattedMessage
                        id='friend-btn-false-stat'
                        defaultMessage='Pending:'
                    >
                        {txt => (
                            <Button disabled color='light'>
                                {txt}
                            </Button>
                        )}
                    </FormattedMessage>

                    <FormattedMessage
                        id='friend-btn-false-stat-disabled'
                        defaultMessage='Friendship:'
                    >
                        {txt => (
                            <Button disabled color='light'>
                                {txt}
                            </Button>
                        )}
                    </FormattedMessage>
                </ButtonGroup>
            )}
            {status === "pending" && (
                <ButtonGroup size='sm'>
                    <FormattedMessage
                        id='friend-btn-pending-stat-accept'
                        defaultMessage='Accept:'
                    >
                        {txt => (
                            <Button
                                value='true'
                                color='info'
                                onClick={handleSubmit}
                            >
                                {txt}
                            </Button>
                        )}
                    </FormattedMessage>

                    <FormattedMessage
                        id='friend-btn-pending-stat-reject'
                        defaultMessage='Reject:'
                    >
                        {txt => (
                            <Button
                                value='false'
                                color='secondary'
                                onClick={handleSubmit}
                            >
                                {txt}
                            </Button>
                        )}
                    </FormattedMessage>
                </ButtonGroup>
            )}
            {status === "true" && (
                <ButtonGroup size='sm'>
                    <FormattedMessage
                        id='friend-btn-true-stat-chat'
                        defaultMessage='Chat:'
                    >
                        {txt => (
                            <Button color='info' onClick={startConversation}>
                                {txt}
                            </Button>
                        )}
                    </FormattedMessage>

                    <FormattedMessage
                        id='friend-btn-true-stat-unfriend'
                        defaultMessage='Unfriend:'
                    >
                        {txt => (
                            <Button
                                value='false'
                                color='light'
                                disabled
                                onClick={handleSubmit}
                            >
                                {txt}
                            </Button>
                        )}
                    </FormattedMessage>
                </ButtonGroup>
            )}
        </>
    );
}

FriendButton.propTypes = {
    responseFriendship: PropTypes.func.isRequired,
    conversations: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
};

export default connect(
    state => ({ conversations: state.conversations, messages: state.messages }),
    { getConversation, responseFriendship }
)(FriendButton);
