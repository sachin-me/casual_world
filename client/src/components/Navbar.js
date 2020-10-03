import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import HomeIcon from '../containers/HomeIcon';
import UserBoard from './UserBoard';
import Create from './Create';
import Notification from './Notification';
import Profile from './Profile';

const socket = io('http://localhost:8000');

class Navbar extends Component {

	state = {
		notifications: []
	}

	componentDidMount = () => {
		const { notifications } = this.state;
		socket.on('notifications', (notification) => {
			console.log('socket called');
			console.log(notification, 'checking notification');
			this.setState({
				notifications: [...notifications, notification]
			})
		})
	}

	render() {
		const { notifications } = this.state;
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
                {
                  userId ? (
                    <Link to={`/${userId}/getboards`} className="navbar-item is-light">
                      <UserBoard />
                    </Link>
                  ) : <div></div>
                }
              </div>
              <div className="navbar-end">
                {
                  userId ? (
                    <>
                      <a className="navbar-item is-light">
                        <Create />
                      </a>
                      <a className="navbar-item is-light">
                        <Notification />
												<span>{notifications ? notifications.length: ''}</span>
                      </a>
                      <Link to={`/${userId}/profile`} className="navbar-item is-light">
                        <Profile />
                      </Link>
                    </>
                  ) : ''
                }
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