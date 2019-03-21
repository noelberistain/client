import React, { Component, Fragment } from "react";
import { validatingUser } from "../../actions/authentication";
import {socket} from "../../actions/sockets";

import LoggedNav from "./LoggedNav";
import Profile from "./Profile";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }
  async componentDidMount() {
    const info = await validatingUser();
    const {email} = info.data;
    if (email) {
      socket.open()
      this.setState({
        user: info.data
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
          <Profile user={this.state.user} />
        </div>
      </Fragment>
    );
  }
}

export default Home;
