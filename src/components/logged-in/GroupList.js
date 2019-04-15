import React from "react";
import { connect } from "react-redux";
import { Alert, Button, Col, Row } from "reactstrap";
import { getGroupMessages } from "../../actions/authentication";
import { FormattedMessage } from "react-intl";

function Groups(props) {
    const startGroupConversation = e => {
        e.preventDefault();
        props.getGroupMessages(e.target.value);
    };

    const { allGroups } = props;
    const groups = allGroups.map(group => (
        <Alert color='primary' key={group._id}>
            <Row style={{ width: "100%" }}>
                <Col className='contact-name'>{group.groupName}</Col>
                <Col>
                    <FormattedMessage id='grp-list-chat' defaultMessage='Chat:'>
                        {txt => (
                            <Button
                                value={group._id}
                                onClick={startGroupConversation}
                            >
                                {txt}
                            </Button>
                        )}
                    </FormattedMessage>
                </Col>
            </Row>
        </Alert>
    ));
    return <>{groups}</>;
}

export default connect(
    state => ({
        allGroups: state.group.allGroups,
        groupMessages: state.group.groupMessages
    }),
    { getGroupMessages }
)(Groups);
