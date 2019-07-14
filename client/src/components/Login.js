import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import actions from '../store/actions';

class Login extends Component {

  state = {
    email: '',
    password: '',
    message: '',
    error: ''
  }

  handleChane = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const data = { email, password }

    if (email.length == 0 && password.length == 0) return this.setState({
      message: 'Please fill the form'
    })
    this.props.dispatch(actions.loginUser(data, success => {
      const { message, error } = this.props;
      if (success) {
        this.setState({
          message: message,
          email: '',
          password: ''
        })
        this.props.history.push('/');
      } else {
        this.setState({
          error: error,
          email: '',
          password: ''
        })
        this.props.history.push('/login');
      }
    }))
  }

  render() {
    const { email, password, message, error } = this.state;
    return (
      <div className='form-wrapper'>
        <div>
          <h3 className='center'>Login</h3>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input" type="email" name='email' placeholder="Email input" value={email} onChange={this.handleChane} />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <p className="control has-icons-left">
              <input className="input" type="password" name='password' placeholder="Password" value={password} onChange={this.handleChane} />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-primary">
                Login
              </button>
            </p>
          </div>
        </form>
        <div className="signup-status center has-text-danger">
          {
            (message && message != 'undefined') ? message : error
          }
        </div>
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