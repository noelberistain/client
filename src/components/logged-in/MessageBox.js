import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Container, Input, InputGroup, Row } from 'reactstrap';
import { createMessage } from '../../actions/authentication';

class MessageBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    sendMessage(obj) {
        const {_id, contact} = obj.conversations.conversationID;
        
        if(this.state.message === '' || _id.length === 0){
            console.log("do nothing / empty input / have to select a conversation")
        }
        else if(_id.length > 0){
            const {message} = this.state
            createMessage(_id,message,contact)
            this.setState({
                message:''
            })
        }
    }

    render() {
        return (
            <Container className="message-box">
                <Row> MESSAGES BOX</Row>
                <Row>
                    <InputGroup>
                        <Input
                            type="text"
                            name="message"
                            placeholder="write a message..."
                            onChange={this.handleInputChange.bind(this)}
                            value={this.state.message} />
                        <Button color="secondary" onClick={() => this.sendMessage(this.props)}>Send Message</Button>
                    </InputGroup>
                </Row>
            </Container>
        )
    }
}

MessageBox.propTypes = {
    conversations: PropTypes.object.isRequired,
    // conversationID: PropTypes.string
}

export default connect(state => (
    {conversations: state.conversations}))(MessageBox)