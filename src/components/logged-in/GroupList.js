import React from 'react';
import {connect} from 'react-redux';
import {Alert,Button,Col,Row} from 'reactstrap';
// import {getGroups} from '../../actions/authentication'

function Groups (props){

const {allGroups} = props;
const groups = allGroups.map(group =>
    <Alert color="primary" key={group._id}>
        <Row>
            <Col className="contact-name">{group.groupName}</Col>
            <Col><Button id={group._id}>Chat</Button></Col>
        </Row>
    </Alert >
);
    return (
        <>
            <ul>{groups}</ul>
        </>
    )
}

export default connect(state => ({
    allGroups: state.group.allGroups,
}))(Groups);