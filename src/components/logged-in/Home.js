import React, { Component } from "react";
import { Container } from "reactstrap";
import { validatingUser, setLang } from "../../actions/authentication";
import { connect } from "react-redux";
import { socket } from "../../actions/sockets";

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
        await this.props.setLang();
        const { email } = info.data;
        const { name } = this.props.user;
        if (email && name) {
            socket.open();
            this.setState({
                user: info.data
            });
        } else {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <Container>
                <LoggedNav />
                <Profile user={this.state.user} />
            </Container>
        );
    }
}

// export default Home;

export default connect(
    state => ({
        lang: state.locale.lang,
        user: state.auth.user
    }),
    { setLang }
)(Home);
