import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeIcon from '../containers/HomeIcon';
import UserBoard from './UserBoard';
import Create from './Create';
import Notification from './Notification';
import Profile from './Profile';

class Navbar extends Component {
	render() {
		const { currentUser } = this.props;
		const userId = currentUser.id || ''
		return (
			<div>
				<nav className="navbar" role="navigation" aria-label="main navigation">
            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">
								<Link to='/' className="navbar-item is-light">
									<HomeIcon />
								</Link>
                <Link to={`/${userId}/getboards`} className="navbar-item is-light">
                  <UserBoard />
                </Link>
              </div>
              <div className="navbar-end">
                <a className="navbar-item is-light">
                  <Create />
                </a>
                <a className="navbar-item is-light">
                  <Notification />
                </a>
                <Link to={`/${userId}/profile`} className="navbar-item is-light">
                  <Profile />
                </Link>
              </div>
            </div>
          </nav>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser || {}
	}
}

export default connect(mapStateToProps)(Navbar);