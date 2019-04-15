import React, { Component } from 'react';
import { FormattedMessage } from "react-intl";
import { Alert, Button, Dropdown, DropdownToggle, DropdownMenu, Row } from 'reactstrap';

class SelectLang extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.preferredLang = this.preferredLang.bind(this)
        this.state = {
            dropdownOpen: false
        };
    }

    componentDidMount() {
        console.log(this.props.plang)
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    preferredLang(e) {
        const {set} = this.props
        set(e.target.value)
        this.toggle()
    }

    render() {
        
        return <>
            <Dropdown direction="right" group isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    <FormattedMessage
                        id="slct-lang-title"
                        defaultMessage="Select Lang"
                    />
                </DropdownToggle>

                <DropdownMenu style={this.menu}>
                    <Row style={{ "marginLeft": "1%" }}>
                        <Alert color="danger" style={this.alert} onClick={this.preferredLang}>
                            <Button value="en-US" style={this.button_danger}>English</Button>
                        </Alert>
                        <Alert style={this.alert} onClick={this.preferredLang}>
                            <Button value="es-419" style={this.button_primary}>Spanish</Button>
                        </Alert>
                    </Row>
                </DropdownMenu>

            </Dropdown>
        </>
    }


    button_danger = {
        "width": "100%",
        "color": "#721c24",
        "backgroundColor": "#f8d7da",
        "border": "none"
    }

    button_primary = {
        "width": "100%",
        "color": "#004085",
        "backgroundColor": "#cce5ff",
        "border": "none"
    }

    alert = {
        "padding": "0% 0%",
        "marginBottom": "0.5%"
    }

    menu = {
        "padding": "0%",
        "border": "none"
    }
}

export default SelectLang;