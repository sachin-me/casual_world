import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Header from './Header';
import Signup from './Signup';
import Dashboard from './Dashboard';

class Main extends Component {
  render() {
    return (
      <div className='route-wrapper'>
        <Router>
          <Switch>
            {/* <Route exact path='/' component={Header} /> */}
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Main;