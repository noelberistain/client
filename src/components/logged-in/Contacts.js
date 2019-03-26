import React, { Component } from 'react'
import {Col, Row} from "reactstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
// import AddContact from "./AddContact";

import { getFriends } from "../../actions/authentication";
import Contact from './Contact';

class Contacts extends Component {

    componentDidMount() {
        this.props.getFriends();
    }

    render() {
        
        return (
            <Row ref={this.inputText}>
                <Col sm={{size:"12"}} md={{size:"5"}}>
                    <Contact {...this.props.contacts} {...this.props.user} />
                </Col>
                <Col  sm={{size:12}} md={{size:"7"}} className="chatBox">
                </Col>
            </Row>
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
