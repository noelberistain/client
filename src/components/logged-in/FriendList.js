import React from 'react';
import { Button, Col, Row } from 'reactstrap';

export default function Friends(props) {
const {contacts,add, remove} = props;
const un_Invite = {
    'color': '#856404',
    'backgroundColor': '#fff3cd',
    'borderColor': '#ffeeba'
}

const invite = {
    'color': '#155724',
    'backgroundColor':' #d4edda',
    'borderColor': '#c3e6cb'
}

    const list = contacts.map(contact => (
        <li key={contact._id}>
            <Row>
                <Col className="contact-name">{contact.name}</Col>
                <Col sm="6">
                    <Button
                        style={invite}
                        size="sm"
                        value={contact._id}
                        onClick={add}
                    >
                        Invite
            </Button>
                    <Button
                        style={un_Invite}
                        size="sm"
                        value={contact._id}
                        onClick={remove}
                    >
                        un-invite
            </Button>
                </Col>
            </Row>
        </li>
    ));

    return (
        <>
            <ul>{list}</ul>
            {/* {contacts.length > 0 && <ul>{list}</ul>}
            {contacts.length === 0 && <span>Sorry you don't have any friends</span>} */}
        </>
    )
}