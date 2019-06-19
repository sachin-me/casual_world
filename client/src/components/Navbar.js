import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '../containers/HomeIcon';
import UserBoard from './UserBoard';
import Create from './Create';
import Notification from './Notification';
import Profile from './Profile';

class Navbar extends Component {
	render() {
		return (
			<div>
				<nav className="navbar" role="navigation" aria-label="main navigation">
            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">
								<Link to='/' className="navbar-item is-light">
									<HomeIcon />
								</Link>
                <a className="navbar-item is-light">
                  <UserBoard />
                </a>
              </div>
              <div className="navbar-end">
                <a className="navbar-item is-light">
                  <Create />
                </a>
                <a className="navbar-item is-light">
                  <Notification />
                </a>
                <a className="navbar-item is-light">
                  <Profile />
                </a>
              </div>
            </div>
          </nav>
			</div>
		);
	}
}

export default Navbar;