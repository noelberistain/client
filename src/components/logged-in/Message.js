import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class SingleMessage extends Component {
    render() {
        const { messages } = this.props.messages;
        const list = messages.map((item, i) => (
            <li className='message-item' key={i}>
                <span className='author'>{item.author}</span>
                <span className='message'>{item.content}</span>
            </li>
        ));
        // console.log(this.props);
        const { single, group } = this.props;
        const ul = <ul className='messages'>{list}</ul>;
        return (
            <>
                {single !== undefined && <>{ul}</>}
                {group !== undefined && <>{ul}</>}
            </>
        );
    }
}

SingleMessage.propTypes = {
    messages: PropTypes.object.isRequired
};

export default connect(state => ({ messages: state.messages }))(SingleMessage);
