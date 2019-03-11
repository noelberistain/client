import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import {
    addFriend,
    validatingUser,
    getFriends
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

    async userExist() {
        const info = await validatingUser();
        if (info) {
            console.log(info)
            //info => value from validating User (active user)
            const ids = [],
                localFriends = await getFriends(info.data._id);
            const { contacts } = localFriends.data;
            for (const key in contacts) {
                if (contacts.hasOwnProperty(key)) {
                    ids.push(contacts[key].contactID);
                }
            }
            return ids;
        } else this.props.history.push("/");
    }

    async handleSubmit(e) {
        e.preventDefault();
        const contactsIDS = await this.userExist();
        const ownEmail = this.props.ownEmail;
        const email = this.state.email;
        if (!isEmpty(email) && email !== ownEmail) {
            // identifier is the retrieved id from db at notification service
            const identifier = await validatingUser(email);
            if (!contactsIDS.includes(identifier.data._id)) {
            addFriend(identifier.data);
        }
        else{
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

export default AddContact;
