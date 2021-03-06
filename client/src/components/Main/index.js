import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbars from './Navbar';
import PublicRoutes from '../Routes/PublicRoutes';
import AuthRoutes from '../Routes/AuthRoutes';

class Main extends Component {
  render() {
    const { currentUser } = this.props;
    const id = currentUser._id;
    return (
      <Router>
        <Navbars />
        <Switch>{id ? <AuthRoutes /> : <PublicRoutes />}</Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps)(Main);
