import React, { Component } from "react";
import {connect} from 'react-redux';
import { Col, Container, Media, Row } from "reactstrap";
import Contacts from "./Contacts";
import { FormattedMessage } from "react-intl";

export class Profile extends Component {
    render() {
        // console.log(this.props)

        const { user } = this.props;
        return (
            <Container>
                <Row className="profile-content">
                    <Col xs="3">
                        <Media>
                            <Media left>
                                <Media
                                    object
                                    src={`http:${user.avatar}`}
                                    alt={user.name}
                                    title={user.name}
                                />
                            </Media>
                        </Media>
                    </Col>
                    <Col xs="6">
                        <Row>
                            <h3>
                                <FormattedMessage id="profile-hello" defaultMessage="Hello"/> 
                                {user.name}
                            </h3>
                        </Row>
                        <Row>
                            <h3>{user.email}</h3>
                        </Row>
                    </Col>
                </Row>
                <Container>
                    <Contacts user={this.props} />
                </Container>
            </Container>
        );
    }
}

// export default Profile;
export default connect(
    state => ({
        lang : state.locale.lang
    })

)(Profile)
