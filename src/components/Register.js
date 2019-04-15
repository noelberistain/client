// Register COMPONENT

// Regular use of binding context using, props through Constructor and super
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../actions/authentication";
import classnames from "classnames";
import InitNav from "./InitNav";
import SelectLang from "./SelectLang";
import { FormattedMessage } from "react-intl";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password_confirm: "",
            errors: {},
            preferredLang:"",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setPlang = this.setPlang.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            preferredLang: this.state.preferredLang
        };
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    
    setPlang(lang){
        this.setState({
            preferredLang: lang
        })
    }
    
    render() {
        let { name, email, password, password_confirm, errors, preferredLang} = this.state;
    return <>
        <InitNav/>
            <div className="container" id="container">
                <h2 style={{ marginBottom: "40px" }}>
                    <FormattedMessage
                    id="reg-title"
                    defaultMessage="Register"
                    />
                    </h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.name
                            })}
                            name="name"
                            onChange={this.handleInputChange}
                            value={name}
                        />
                        {/* <div style={{"border":"1px solid black"}}>errors name: {errors.name}</div> */}
                        {errors.name && (
                            <div className="invalid-feedback">{errors.name}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.email
                            })}
                            name="email"
                            onChange={this.handleInputChange}
                            value={email}
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.password
                            })}
                            name="password"
                            onChange={this.handleInputChange}
                            value={password}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.password_confirm
                            })}
                            name="password_confirm"
                            onChange={this.handleInputChange}
                            value={password_confirm}
                        />
                        {errors.password_confirm && (
                            <div className="invalid-feedback">{errors.password_confirm}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            <FormattedMessage
                                id="reg-btn"
                                defaultMessage="Register User"
                            />
                    </button>
            {password.length>0 && <SelectLang plang={preferredLang} set={this.setPlang}/>}
                    </div>
                </form>
            </div>
    </>
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
