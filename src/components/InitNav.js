//initial NAVBAR COMPONENT

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class InitialNav extends Component {

    render() {

        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto" id="init">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Sign In
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
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
