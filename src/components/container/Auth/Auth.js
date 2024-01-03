import React from "react";
import classes from './Auth.css'
import "./Auth.css"
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input"
import is from 'is_js'
import { connect } from 'react-redux'
import { auth } from "../../../store/actions/auth";

class Auth extends React.Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter correct email',
                valid: false,
                touched: false,
                validation: {
                    requiered: true,
                    email: true
                }
            }, 
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter correct passwrod',
                valid: false,
                touched: false,
                validation: {
                    requiered: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = async () => {

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        ) 
    }

    registrationHandler =  () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        ) 
    }

    submitHandler = (event) => {
        event.preventDefault();
    };

    validateControl(value, validation) {
        if (!validation) {
            return true;
        }

        let isValid = true;

        if(validation.requiered) {
            isValid = value.trim() !== '' && isValid
        }
         
        if(validation.email) {
            isValid = is.email(value) && isValid
        }
        
        if(validation.minLength){
            isValid = value.trim().length >= validation.minLength && isValid
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        console.log(`${controlName}`, event.target.value)
        const formControls = {...this.state.formControls}
        const control = { ...formControls }

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        }) 

        this.setState({
            formControls,
            isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                    <Input
                        key={controlName + index}
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.tauched}
                        label={control.label}
                        errorMessage={control.errorMessage}
                        shouldValidate={!!control.validation}
                        onChange={event => this.onChangeHandler(event, controlName)}
                    />
            )
        });
    }




    render() {
        return (
            <div className="Auth">
                <div>
                    <h1>Authentication </h1>
                    <form onSubmit={this.submitHandler} className="AuthForm">
                        { this.renderInputs() }
                        <Button type='success' onClick={this.loginHandler} disabled={!this.state.isFormValid}>Enter</Button>
                        <Button type='primary' onClick={this.registrationHandler}>Registration</Button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        auth: (email, password, isLoggin) => dispatch(auth(email, password, isLoggin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);