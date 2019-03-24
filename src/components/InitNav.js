//initial NAVBAR COMPONENT

import React, { Component } from "react";
import { Container, Col, NavItem, Nav } from "reactstrap";
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
                                Sign In
                                </Link>
                        </NavItem>
                    </Col>
                    <Col xs="6">
                        <NavItem>
                            <Link className="nav-link" to="/register">
                                Sign Up
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
