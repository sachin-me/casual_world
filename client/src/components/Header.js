import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className='user-entry'>
        <Link to='/login' className='login-btn'>
          <button className='button is-link'>Log in</button>
        </Link>
        <Link to='/signup' className='signup-btn'>
          <button className='button is-link'>Sign up</button>
        </Link>
      </div>
    );
  }
}

export default Header;