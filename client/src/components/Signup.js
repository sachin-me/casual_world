import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Signup extends Component {

  state = {
    name: '',
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
    const { name, email, password } = this.state;
    return (
      <div>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" type="text" name='name' placeholder="enter your name" value={name} onChange={this.handleChane} />
          </div>
        </div>
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
        <div>
          <span>Already has an account, </span><Link to='/login'>login?</Link>
        </div>
      </div>
    );
  }
}

export default Signup;