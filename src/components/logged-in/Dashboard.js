import React, { Component } from "react";

class NavbarDashboard extends Component {

    onlogOut = (e) => {
        e.preventDefault();
        console.log("logoteando")
    }
    
    render() {

        return (
            <div>
                <div>
                    <h1>Dashboard</h1>
                </div>
                <div>
                    <ul className="navbar-nav ml-auto">
                        <a href="/" className="nav-link" onClick={this.onlogOut}>
                            {/* <img
                                src={user.avatar}
                                alt={user.name}
                                title={user.name}
                                className="rounded-circle"
                                style={{ width: "25px", marginRight: "5px" }}
                            /> */}
                            Hello, wanna Logout ?
            </a>
                    </ul>
                </div>{" "}
            </div>
        );
    }
}

export default NavbarDashboard;
