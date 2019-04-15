//NAVBAR COMPONENT

import React, { Component } from "react";
import { Col, Container, Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authentication";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";

class InitialNav extends Component {
    onLogout = e => {
        // e.preventDefault();
        this.props.logoutUser(this.props.history);
    };

    render() {
        return (
            <Container>
                    <Nav pills >
                        <Col xs="6">
                            <NavItem color="primary">
                                <Link disabled className="nav-link" to="/home">
                                    <FormattedMessage
                                    id="logged-nav-home"
                                    defaultMessage="Home:"
                                    />
                                </Link>
                            </NavItem>  
                        </Col>
                        <Col xs="6">
                            <NavItem color="primary">
                                <Link className="nav-link" to="/" onClick={this.onLogout.bind(this)}>
                                    <FormattedMessage
                                    id="logged-nav-logout"
                                    defaultMessage="Logout:"
                                    />
                                </Link>
                            </NavItem>
                        </Col>
                    </Nav>
            </Container>
        );
    }
}

InitialNav.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//     auth: state.auth
// })

export default connect(
    state => ({
        auth: state.auth
    }),
    { logoutUser }
)(withRouter(InitialNav));
