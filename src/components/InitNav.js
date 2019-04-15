//initial NAVBAR COMPONENT

import React, { Component } from "react";
import { Container, Col, NavItem, Nav } from "reactstrap";
import { FormattedMessage } from 'react-intl';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class InitialNav extends Component {

    render() {
        return (
            <Container>
                <Nav pills>
                    <Col xs="6">
                        <NavItem>
                            <Link className="nav-link" to="/">
                                <FormattedMessage id="btn-sign-in"/>
                            </Link>
                        </NavItem>
                    </Col>
                    <Col xs="6">
                        <NavItem>
                            <Link className="nav-link" to="/register">
                                <FormattedMessage id="btn-sign-up"/>
                                </Link>
                        </NavItem>
                    </Col>
                </Nav>
            </Container>
        );
    }
}

InitialNav.propTypes = {
    auth: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//     auth: state.auth
// })

export default connect(
    state => ({
        auth: state.auth
    })
)(withRouter(InitialNav));
