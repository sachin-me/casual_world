import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChane = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className='form-wrapper'>
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
        <div className='center'>
          <Link to='/signup'>Create an account?</Link>
        </div>
      </div>
    );
  }
}

export default Login;