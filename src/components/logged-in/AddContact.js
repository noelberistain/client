// import React, { Component } from "react";
// import { Form, FormGroup, Input, Label, Button } from "reactstrap";
// import isEmpty from "../../validation/is-empty";
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import {
//     addFriend,
//     validatingUser
// } from "../../actions/authentication";

// class AddContact extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { email: "" };
//         this.handleInputChange = this.handleInputChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

    // handleInputChange(e) {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    // }

    // async handleSubmit(e) {
    //     e.preventDefault();
    //     console.log(this.props)
    //     const ownEmail = this.props.email;
    //     const email = this.state.email;
    //     const user = this.props;
    //     console.log(ownEmail)
    //     console.log(email)
    //     console.log(user)

    //     const { contacts } = this.props.contacts

    //     console.log(contacts, "\n", typeof contacts, "\n", contacts.length)
    //     const idContacts = contacts.map(value => value._id)
    //     console.log(idContacts)
    //     if (!isEmpty(email) && email !== ownEmail) {
    //         // identifier is the retrieved id from db at notification service
    //         const identifiers = await validatingUser(email);
    //         if (!idContacts.includes(identifiers.data._id)) {
    //             this.props.addFriend({ ...identifiers, ...user });
    //         }
    //         else {
    //             console.log("PENDEJAZO this user's your friend already")
    //         }
    //     } else {
    //         console.log(`something is wrong with the inputed value /
    //         or might have it already -> ${email}`);
    //     }
    // }

    // render() {

//         return (
//             <div>
//                 <Form> 
//                     onSubmit={this.handleSubmit}>
//                     <FormGroup>
//                         <Label for="exampleEmail">Email</Label>
//                         <Input
//                             type="email"
//                             name="email"
//                             placeholder="right@mail.com"
//                             onChange={this.handleInputChange}
//                             value={this.state.email} />
//                     </FormGroup>
//                     <Button onClick={this.handleSubmit}>Invite</Button>
//                 </Form>
//             </div>
//         );
//     }
// }
// AddContact.propTypes = {
//     addFriend: PropTypes.func.isRequired,
//     contacts: PropTypes.object.isRequired
// }

// // const mapStateToProps = state => ({
// //     contatcs: state.contacts
// // })
// export default connect(state => ({ contacts: state.contacts }), { addFriend })(AddContact);
