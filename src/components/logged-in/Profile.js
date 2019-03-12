import React, { Component } from "react";
import ContactsList from "./Contacts";

export class Profile extends Component {
    render() {
        const { user } = this.props;
        return (
            <>
                <div className="container" id="container">
                    <div className="title profile">
                        <img
                            src={`http:${user.avatar}`}
                            alt={user.name}
                            title={user.name}
                            className="rounded-circle"
                        />
                        <h2 className="h2-profile"> Hello {user.name}</h2>
                    </div>
                    <div>
                        <label htmlFor="name">Name: {user.name}</label>
                    </div>
                    <div>
                        <label htmlFor="email">Email: {user.email}</label>
                    </div>
                </div>
                <div className="container" id="container">
                    <div className="title profile">
                        <ContactsList email={user.email} />
                    </div>
                </div>
            </>
        );
    }
}

export default Profile;
