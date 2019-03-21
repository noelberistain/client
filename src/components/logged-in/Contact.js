import React from 'react'
import Button from './FriendButton';

export default function Contact(props) {
    
    const contacts = props.contacts
    const list = contacts.map( contact => 
        <li key={contact._id}>
            <img
                src={contact.avatar}
                alt={contact.name}
                title={contact.name}
                className="rounded-circle friend-image"
            />
            {contact.name} | {contact.email} | <Button status= {contact.status.toString()}/>
        </li>
    );
    return (
        <>
        {contacts.length > 0 && <ul className="contact">{list}</ul> }
        {contacts.length === 0 && <span>Sorry you don't have any friends</span>}
        </>
    )
}