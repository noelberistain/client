//NAVBAR COMPONENT

import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authentication";
import { withRouter } from "react-router-dom";

class InitialNav extends Component {
    onLogout = e => {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    };

    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto" id="init">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home">
                                    HOME
                            </Link>
                            </li> 
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={this.onLogout.bind(this)}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </Fragment>
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
