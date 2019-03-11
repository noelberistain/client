import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

import AddContact from "./AddContact";

import {getFriends} from "../../actions/authentication";

class Contacts extends Component {

    componentDidMount() {
        this.props.getFriends();
    }
        
        render() {
        const {contacts} = this.props.contacts;
        console.log(contacts) //arr obj this.props.contacts.contacts {status - contactID}
        return (
            <>
            <div className="container">
                <AddContact />
            </div>
                <h1>Friends:</h1>
                <ul>
                    {contacts.map((friend,i) => (
                        <li key={i}>
                        <img
                            src={`http:${friend.user.avatar}`}
                            alt={friend.user.name}
                            title={friend.user.name}
                            className="rounded-circle"
                        />
                        {friend.user.name} | {friend.user.email} | {friend.status}

                        </li>
                    ))}
                    {/* {contacts.length === 0 && <span>Sorry you don't have any friends</span> } */}
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
export default connect(state=>({contacts:state.contacts}),{getFriends})(Contacts);
