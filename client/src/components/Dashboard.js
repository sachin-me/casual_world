import React, { Component } from 'react';
import HomeIcon from '../containers/HomeIcon';
import UserBoard from './UserBoard';
import Create from './Create';
import Notification from './Notification';
import Profile from './Profile';
import UserOnBoard from './UserOnBoard';

class Dashboard extends Component {
  render() {
    return (
      <>
        <div className='dashboard-wrapper'>
          <nav className="navbar" role="navigation" aria-label="main navigation">
            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">
                <a className="navbar-item is-light">
                  <HomeIcon />
                </a>
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
        <div>
          <UserOnBoard />
        </div>
      </>
    );
  }
}

export default Dashboard;