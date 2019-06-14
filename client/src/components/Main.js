import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Header from './Header';

class Main extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={Header} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Main;