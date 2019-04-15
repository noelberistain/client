// APP

import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import es from "react-intl/locale-data/es";

import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/logged-in/Home";
// import {initSocket} from "../src/actions/sockets"
// initSocket(store.dispatch)
import { setLang } from "./actions/authentication";

addLocaleData([...en, ...es]);

let appStringResources = null;

class App extends Component {
    componentDidMount() {
        this.props.setLang();
    }

    set(def) {
        const lang = def;
        appStringResources = require(`../locale/${lang}.json`);
        return def;
    }

    render() {
        const { lang } = this.props;
        return (
            <IntlProvider locale={this.set(lang)} messages={appStringResources}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route path='/register' component={Register} />
                        <Route path='/home' component={Home} />
                    </Switch>
                </Router>
            </IntlProvider>
        );
    }
}

// export default App;
export default connect(
    state => ({
        lang: state.locale.lang
    }),
    { setLang }
)(App);
