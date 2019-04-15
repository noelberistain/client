import React, { Component } from "react";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import isEmpty from "../../validation/is-empty";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addFriend, validatingUser } from "../../actions/authentication";
import { FormattedMessage } from "react-intl";

class AddContactModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            email: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.toggle();
        const ownEmail = this.props.email;
        const email = this.state.email;
        const user = this.props;
        const { contacts } = this.props.contacts;
        const idContacts = contacts.map(value => value._id);
        if (!isEmpty(email) && email !== ownEmail) {
            // identifier is the retrieved id from db at notification service
            const identifiers = await validatingUser(email);
            if (!idContacts.includes(identifiers.data._id)) {
                this.props.addFriend({ ...identifiers, ...user });
            } else {
                console.log("PENDEJAZO this user's your friend already");
            }
        } else {
            console.log(`something is wrong with the inputed value /
            or might have it already -> ${email}`);
        }
        this.setState({ email: "" });
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div className='add-contact'>
                <Button size='sm' color='primary' onClick={this.toggle}>
                    <FormattedMessage
                        id='add-contact-modal-btn'
                        defaultMessage='Contact:'
                    />
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle}>
                        <FormattedMessage
                            id='add-contact-modal-header'
                            defaultMessage='Add contact:'
                        />
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={e => e.preventDefault()}>
                            <FormGroup>
                                <Label for='exampleEmail'>
                                    <FormattedMessage
                                        id='add-contact-modal-email-label'
                                        defaultMessage='Email:'
                                    />
                                </Label>
                                <Input
                                    type='email'
                                    name='email'
                                    placeholder='right@mail.com'
                                    onChange={this.handleInputChange}
                                    value={this.state.email}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <FormattedMessage
                            id='add-contact-modal-invite-btn'
                            defaultMessage='Invite:'
                        >
                            {txt => (
                                <Button
                                    color='primary'
                                    onClick={this.handleSubmit}
                                >
                                    {txt}
                                </Button>
                            )}
                        </FormattedMessage>
                        <FormattedMessage
                            id='add-contact-modal-cancel'
                            defaultMessage='Cancel:'
                        >
                            {txt => (
                                <Button color='secondary' onClick={this.toggle}>
                                    {txt}
                                </Button>
                            )}
                        </FormattedMessage>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

AddContactModal.propTypes = {
    addFriend: PropTypes.func.isRequired,
    contacts: PropTypes.object.isRequired
};

export default connect(
    state => ({ contacts: state.contacts }),
    { addFriend }
)(AddContactModal);
