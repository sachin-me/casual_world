import React, { Component } from 'react';
import { connect } from 'react-redux';

import Logout from './Logout';

class UserProfile extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <div className="userprofile-dropdown">
        <div>{currentUser.name}</div>
        <div>{currentUser.email}</div>
        <Logout />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser || {},
  };
};

export default connect(mapStateToProps)(UserProfile);
