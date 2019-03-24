import React, { Component } from "react";
import { Col, Container, Media,Row } from "reactstrap";
import Contacts from "./Contacts";

export class Profile extends Component {
    render() {
        const { user } = this.props;
        return <Container>
                    <Row className="profile-content">
                        <Col xs="3">
                            <Media>
                                <Media left>
                                    <Media object
                                        src={`http:${user.avatar}`}
                                        alt={user.name}
                                        title={user.name}
                                    />
                                </Media>
                            </Media>
                        </Col>
                        <Col xs="6">
                            <Row><h3> Hello {user.name}</h3></Row>
                            <Row><h3>{user.email}</h3></Row>
                        </Col>
                    </Row>
                <Container>
                    <Row>
                        <Contacts user={this.props} />
                    </Row>
                </Container>
        </Container>;
    }
}

export default Profile;
