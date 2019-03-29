import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import Friends from './FriendList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToGroup, createGroupConversation, removeFromGroup, reset, setNameGroup } from '../../actions/authentication';
import { getGroups } from '../../actions/authentication';

class GroupModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.props.getGroups()
    }

    addItem(e){
        e.preventDefault()
        let item = e.target.value;
        this.props.addToGroup(item)
    }

    removeItem(e){
        e.preventDefault();
        let item = e.target.value;
        this.props.removeFromGroup(item)
    }

    handleInputChange(e) {
        e.preventDefault()
        this.props.setNameGroup(e.target.value)
    }

    handleSubmit(e) {
        e.preventDefault();
        const {groupName, groupContacts}= this.props;
        createGroupConversation(groupName,groupContacts)
        this.toggle();
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    button() {
        return (
            <Button size="sm" color="primary" onClick={this.toggle}>
                Group
                </Button>
        )
    }

    render() {
        const { contacts } = this.props;
        return (
            <div className="add-contact">
                {contacts.contacts.length>1&&this.button()}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle}>
                        <Label sm={10}>{this.props.groupName}</Label>
                        <Input onChange={this.handleInputChange} type="text" name="name" placeholder="set a group name" />
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={e => e.preventDefault()}>
                            <FormGroup>
                                <Friends {...contacts} remove={this.removeItem} add={this.addItem} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmit}>Save</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

GroupModal.propTypes = {
    addToGroup: PropTypes.func.isRequired,
    removeFromGroup: PropTypes.func.isRequired,
    setNameGroup: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    getGroups: PropTypes.func.isRequired
}

export default connect(state => ({
    contacts: state.contacts,
    groupName: state.group.groupName,
    groupContacts: state.group.groupContacts,
    allGroups: state.group.allGroups,
}),
    {
        addToGroup,
        removeFromGroup,
        setNameGroup,
        getGroups,
        reset
    })(GroupModal);
