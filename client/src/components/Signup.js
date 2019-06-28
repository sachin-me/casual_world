import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from '../store/actions';

class Signup extends Component {

  state = {
    name: '',
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
    const { name, email, password } = this.state;
    const data = { name, email, password };
    
    if (name.length == 0 && email.length == 0 && password.length == 0) return this.setState({
      message: 'Please fill the form'
    })
    this.props.dispatch(actions.createUser(data, success => {
      if (success) {
        const { message } = this.props;
        this.setState({
          message: message,
          name: '',
          email: '',
          password: ''
        })
        this.props.history.push('/login');
      } else {
        const { error } = this.props;
        if (error !== 'undefined') {
          this.setState({
            error: error,
            name: '',
            email: '',
            password: ''
          })
          this.props.history.push('/signup');
        }
      }
    }));
  }

  render() {
    const { name, email, password, message, error } = this.state;
    return (
      <div className='form-wrapper'>
        <div>
          <h3 className='center'>Create an account</h3>
        </div>
        <form onSubmit={this.handleSubmit}>
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
                Signup
              </button>
            </p>
          </div>
        </form>
        <div className="signup-status center">
          {
            (message && message != 'undefined') ? message : error
          }
        </div>
        <div className="goto-login center">
          <span>Already has an account, </span><Link to='/login'>login?</Link>
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

export default connect(mapStateToProps)(Signup);