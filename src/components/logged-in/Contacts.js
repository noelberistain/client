import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import AddContact from "./AddContact";

import { getFriends } from "../../actions/authentication";
import Contact from './Contact';

class Contacts extends Component {

    componentDidMount() {
        this.props.getFriends();
    }

    render() {

        const { contacts } = this.props.contacts;
        
        return (
            <>
                <div className="container">
                    <AddContact info={this.props.user} />
                </div>
                <h5>Friends:</h5>
                    <Contact contacts={contacts}/>
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
