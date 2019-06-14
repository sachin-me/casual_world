import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <Link to='/login'>Login</Link>
      </div>
    );
  }
}

export default Header;