// APP 

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/logged-in/Home"
import {initSocket} from "../src/actions/sockets"
initSocket(store.dispatch)

class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/home" component={Home} />
            </Switch>
          </Router>
      </Provider>
    );
  }
}

export default App;
