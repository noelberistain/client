import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label} from "reactstrap";
import Friends from './FriendList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFriend } from '../../actions/authentication';

class GroupModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: "New Group",
            list:[]
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    removeItem(e){
        e.preventDefault();
        const id = e.target.value;
        this.setState(state => {
            const list = [...state.list].filter(item => item !== id)
            return {
                list
            };
        });
    }

    onAddItem(e) {
        e.preventDefault();
        const item = e.target.value
        this.setState(state => {
            const list = [...state.list, item];
            return {
                list
            };
        });
    }

    handleSubmit(e){
        e.preventDefault();
        
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        const {contacts} = this.props;

        return (
            <div className="add-contact">
                <Button size="sm" color="primary" onClick={this.toggle}>
                    Group
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle}>
                                <Label sm={10}>{this.state.name}</Label>
                                <Input onChange={this.handleInputChange} type="text" name="name" placeholder="set a group name" />
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={e=>e.preventDefault()}>
                            <FormGroup>
                                <Friends {...contacts} remove={this.removeItem} add={this.onAddItem}/>
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
    addFriend: PropTypes.func.isRequired,
    contacts: PropTypes.object.isRequired
}

export default connect(state => ({ contacts: state.contacts }), { addFriend })(GroupModal);
