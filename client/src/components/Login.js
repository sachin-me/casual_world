import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import actions from '../store/actions';
import helperFunctions from "../utility";
import commonComponents from "./CommonComponents";

let {validateEmail, validatePassword, toProperCase} = helperFunctions;
let { InputBox, Message, SubmitButton } = commonComponents;

class Login extends Component {

  state = {
    email: '',
    password: '',
    message: '',
    error: ''
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    })
  }

  validateEmailPassword = () => {
    let { email, password } = this.state;
    this.setState({
      validEmail: validateEmail(email),
      validPassword: validatePassword(password)
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (validateEmail(email) && validatePassword(password)) {
      const data = { email, password }

      this.props.dispatch(actions.loginUser(data, this.handleSubmitReturn))
    } else {
      this.setState({
        error: 'Email or Password is invalid'
      })
    }
  }

  handleSubmitReturn = (success, error) => {
    if (success) {
      this.props.history.push('/');
    } else {
      this.setState({
        error: error
      })
    }
  };

  render() {
    const { email, password, message, error } = this.state;
    return (
      <div className='form-wrapper'>
        <div>
          <h3 className='center'>Login</h3>
        </div>
        <form onSubmit={this.handleSubmit}>
          <InputBox name="email" type="text" placeholder="Enter the email" handleChange={this.handleChange} onBlur={this.validateEmailPassword}/>  
          <InputBox name="password" type="password" placeholder="Enter the password" handleChange={this.handleChange} onBlur={this.validateEmailPassword}/>
          <SubmitButton text="Login" />
        </form>
        <Message message={message} error={error}/>
        <div className='center'>
          <Link to='/signup'>Create an account?</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    error: state.error
  }
}

export default connect(mapStateToProps)(Login);