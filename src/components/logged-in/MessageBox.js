import React, { Component, createRef } from 'react'
import { Button, Container, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';

export default class MessageBox extends Component {
    constructor(props) {
        super(props)
        this.test = createRef();
    }
    render() {
        return (
            <Container className="message-box">
                <Row> MESSAGES BOX</Row>
                <Row>
                    <InputGroup>
                        
                            <Input placeholder="and..." />
                            <InputGroupAddon addonType="append"><Button color="secondary">I'm a button</Button></InputGroupAddon>
                    </InputGroup>
                </Row>
      </Container>
                )
              }
            }
