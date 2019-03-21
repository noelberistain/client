import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import AddContact from "./AddContact";

import { getFriends } from "../../actions/authentication";

class Contacts extends Component {

    componentDidMount() {
        this.props.getFriends();
    }

    render() {
        const { contacts } = this.props.contacts;
        console.log(contacts)
        return (
            <>
                <div className="container">
                    <AddContact info={this.props.user} />
                </div>
                <h1>Friends:</h1>
                <ul>
                    {/* {contacts.length > 0 && contacts.map((friend, i) => (
                        <li key={i}>
                            <img
                                src={friend.avatar}
                                alt={friend.name}
                                title={friend.name}
                                className="rounded-circle"
                            />
                            {friend.name} | {friend.email} | {friend.status.toString()}
                        </li>
                    ))}
                    {contacts.length === 0 && <span>Sorry you don't have any friends</span>} */}
                </ul>
            </>
        );
    }
}

Contacts.propTypes = {
    getFriends: PropTypes.func.isRequired,
    contacts: PropTypes.object.isRequired
}

// const mapStateToProps = state => ({
//     contatcs: state.contacts
// })
export default connect(state => ({ contacts: state.contacts }), { getFriends })(Contacts);
