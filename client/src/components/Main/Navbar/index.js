import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Navbar, Button, Nav } from 'react-bootstrap';

import HomeIcon from '../../../containers/HomeIcon';
import UserBoard from '../../Common/UserBoard';
import Profile from './Profile';

const socket = io('http://localhost:8000');

class Navbars extends Component {
  state = {
    notifications: [],
  };

  componentDidMount = () => {
    const { notifications } = this.state;
    socket.on('notifications', (notification) => {
      console.log('socket called');
      console.log(notification, 'checking notification');
      this.setState({
        notifications: [...notifications, notification],
      });
    });
  };

  render() {
    const { notifications } = this.state;
    const { currentUser } = this.props;
    const userId = currentUser._id || '';
    return (
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/">
              <Button>
                <HomeIcon />
              </Button>
            </Link>

            {userId ? (
              <Link to="/getboards">
                <Button>
                  <UserBoard />
                </Button>
              </Link>
            ) : null}
          </Nav>

          {userId ? (
            <Nav>
              <Link to="#">
                <Button>+</Button>
              </Link>
              <Link to="#">
                <Button>
                  <span>{notifications ? notifications.length : ''}</span>{' '}
                  <i className="fas fa-bell"></i>
                </Button>
              </Link>
              <Link to="/profile">
                <Button>
                  <Profile />
                </Button>
              </Link>
            </Nav>
          ) : (
            <Nav>
              <Link to="/login">
                <Button>Log in</Button>
              </Link>

              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser || {},
  };
};

export default connect(mapStateToProps)(Navbars);
