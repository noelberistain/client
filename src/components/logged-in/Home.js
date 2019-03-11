import React, { Component, Fragment } from "react";
// import {connect} from "react-redux";
// import PropTypes from 'prop-types';
import { validatingUser } from "../../actions/authentication";
import LoggedNav from "./LoggedNav";
import Profile from "./Profile";

// import Search from "./Search";

class Home extends Component {
    constructor() {
        super();
        this.state = { 
            user:{}
        };
    }
    async componentDidMount() {
        const info = await validatingUser();
        if (info) {
            this.setState({
                user:info.data
            });
        } else {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <Fragment>
                <LoggedNav />
                <div className="container" id="container">
                    {/* <h1>{this.state.justName}'s Home</h1> */}
                    <Profile user = {this.state.user} />
                    {/*  WAS TRYING TO MAKE A SEARCH BOX AND DISPLAY ONLY THE MATCHES TO THE SEARCH <Search/> */}
                </div>
            </Fragment>
        );
    }
}

export default Home;
