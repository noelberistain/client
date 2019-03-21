import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    addFriend,
    validatingUser
} from "../../actions/authentication";

class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "" };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }    

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const ownEmail = this.props.info.user.email;
        const email = this.state.email;
        const { user} = this.props.info;
        console.log(this.props.info) //.user.id
        const { contacts } = this.props.contacts;
        const idContacts = contacts.map(value => value._id)
        if (!isEmpty(email) && email !== ownEmail) {
            // identifier is the retrieved id from db at notification service
            const identifiers = await validatingUser(email);
			console.log('TCL: AddContact -> handleSubmit -> identifiers', identifiers)
            if (!idContacts.includes(identifiers.data._id)) {
                this.props.addFriend({...identifiers,...user});
            }
            else {
                console.log("PENDEJAZO this user's your friend already")
            }
        } else {
            console.log(`something is wrong with the inputed value /
            or might have it already -> ${email}`);
        }
    }
    
    render() {
        return (
            <div className="container" id="container">
                <div className="title">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Add a friend:</h3>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                className="form-control form-control-lg"
                                name="email"
                                onChange={this.handleInputChange}
                                value={this.state.email}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
AddContact.propTypes = {
    addFriend: PropTypes.func.isRequired,
    contacts: PropTypes.object.isRequired
}

// const mapStateToProps = state => ({
//     contatcs: state.contacts
// })
export default connect(state => ({ contacts: state.contacts }), { addFriend })(AddContact);
