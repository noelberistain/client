import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SingleMessage from "./Message";
import { Button, Container, Input, InputGroup, Row } from "reactstrap";
import { createMessage } from "../../actions/authentication";
import { FormattedMessage } from "react-intl";

class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message:'',
        };
    }
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    sendMessage(obj) {
        if (
            obj.conversations.conversationID &&
            obj.conversations.conversationID._id.length > 0
        ) {
            const { _id, contact } = obj.conversations.conversationID;
            // this.setState({actual:_id})
            if (this.state.message === "" || _id.length === 0) {
                console.log("do nothing / empty message");
            } else if (_id.length > 0) {
                const { message } = this.state;
                createMessage(_id, message, contact);
                this.setState({
                    message: ""
                });
            }
        }
        if (
            obj.groupMessages.activeConv &&
            obj.groupMessages.activeConv.length > 0
        ) {
            const theOne = obj.allGroups.filter(group =>
                group._id.includes(obj.groupMessages.activeConv)
            );
            const { _id, participants } = theOne[0];
            // this.setState({actual:_id})
            if (this.state.message === "") {
                console.log("do nothing / empty message");
            } else if (participants.length > 0) {
                const { message } = this.state;
                console.log(this.state)
                createMessage(_id, message, participants);
                this.setState({
                    message: '',
                });
            }
        }
    }

    render() {
        const { conversationID } = this.props.conversations;
        const { activeConv } = this.props.groupMessages;

        return (
            <Container className='message-box'>
                <Row className='fixedMessages'>
                    <Row>
                        <SingleMessage single={conversationID._id} group={activeConv} />
                        {conversationID._id && (
                            <InputGroup className='button-send'>
                                <Input
                                    type='text'
                                    name='message'
                                    placeholder='write a message...'
                                    onChange={this.handleInputChange.bind(this)}
                                    value={this.state.message}
                                />
                                <FormattedMessage
                                    id='message-box-send-message'
                                    defaultMessage='Send Message:'
                                >
                                    {txt => (
                                        <Button
                                            color='secondary'
                                            onClick={() =>
                                                this.sendMessage(this.props)
                                            }
                                        >
                                            {txt}
                                        </Button>
                                    )}
                                </FormattedMessage>
                            </InputGroup>
                        )}
                        {activeConv && (
                            <InputGroup className='button-send'>
                                <Input
                                    type='text'
                                    name='message'
                                    placeholder='write a message...'
                                    onChange={this.handleInputChange.bind(this)}
                                    value={this.state.message}
                                />
                                <FormattedMessage
                                    id='message-box-send-message'
                                    defaultMessage='Send Message:'
                                >
                                    {txt => (
                                        <Button
                                            color='secondary'
                                            onClick={() =>
                                                this.sendMessage(this.props)
                                            }
                                        >
                                            {txt}
                                        </Button>
                                    )}
                                </FormattedMessage>
                            </InputGroup>
                        )}
                    </Row>
                </Row>
            </Container>
        );
    }
}

MessageBox.propTypes = {
    conversations: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
};

export default connect(state => ({
    conversations: state.conversations,
    messages: state.messages,
    groupMessages: state.group.groupMessages,
    allGroups: state.group.allGroups
}))(MessageBox);
