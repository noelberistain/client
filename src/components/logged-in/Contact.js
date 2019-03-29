import React from 'react';
import { Alert, Col, Row } from "reactstrap";
import Button from './FriendButton';
import AddContactModal from './AddContact_modal';
import GroupModal from './GroupModal';
import GroupList from './GroupList';

export default function Contact(props) {

    const contacts = props.contacts
    const list = contacts.map(contact =>
        <Alert color="primary" key={contact._id}>
            <Row>
                <Col className="contact-name">{contact.name}</Col>
                <Col><Button status={contact.status.toString()} id={contact._id} /></Col>
            </Row>
        </Alert >
    );
    return (
        <>
            <Row className="contacts-title">
                <Col><h5>Contacts:</h5></Col>
                <Col><GroupModal {...props.user} /></Col>
                <Col><AddContactModal {...props.user} /></Col>
            </Row>
            <Row>
                <Col>
                <h5>Groups</h5>
                <GroupList />
                </Col>
            </Row>
            {contacts.length > 0 && <>{list}</>}
            {contacts.length === 0 && <span>Sorry you don't have any friends</span>}
        </>
    )
}