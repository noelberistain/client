import React, { Component } from 'react'
import Profile from './Profile'
import { read_cookie } from 'sfcookies';
import LoggedNav from './LoggedNav';


export default class Home extends Component {

    componentDidMount = () => {
        const cookie = read_cookie('jwToken');
        console.log(cookie);
    }

    render() {
        return <>
            <LoggedNav/>
            <div className="container" id="container">
                <h1>Home Component and profile (below)</h1>
                <Profile />
            </div>
        </>
    }
}
