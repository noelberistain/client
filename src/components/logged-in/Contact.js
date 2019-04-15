import React from "react";
import { Alert, Col, Row } from "reactstrap";
import Button from "./FriendButton";
import AddContactModal from "./AddContact_modal";
import GroupModal from "./GroupModal";
import GroupList from "./GroupList";
import { FormattedMessage } from "react-intl";

export default function Contact(props) {
    const contacts = props.contacts;
    const accepted = contacts.filter(item => item.status === "true");
    const list = contacts.map(contact => (
        <Alert color='primary' key={contact._id}>
            <Row style={{ width: "100%" }}>
                <Col className='contact-name'>{contact.name}</Col>
                <Col>
                    <Button
                        status={contact.status.toString()}
                        id={contact._id}
                    />
                </Col>
            </Row>
        </Alert>
    ));
    return (
        <>
            <Row className='contacts-title'>
                <Col>
                    <h5>
                        <FormattedMessage
                            id='contact-title'
                            defaultMessage='Contacts:'
                        />
                    </h5>
                </Col>
                <Col>
                    <GroupModal {...props.user} length={accepted.length} />
                </Col>
                <Col>
                    <AddContactModal {...props.user} />
                </Col>
            </Row>
            {contacts.length > 0 && <>{list}</>}
            {contacts.length === 0 && (
                    <FormattedMessage
                        id='contact-span-no-friends'
                        defaultMessage="Sorry you don't have any friends"
                    />
            )}
            <Row className='contacts-title'>
                <Col>
                    <h5>
                        <FormattedMessage
                            id='contact-groups-title'
                            defaultMessage='Groups'
                        />
                    </h5>
                    <GroupList />
                </Col>
            </Row>
        </>
    );
}
