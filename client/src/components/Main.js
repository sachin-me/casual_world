import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Header from './Header';
import Signup from './Signup';
import Dashboard from './Dashboard';
import CreateNewBoard from './CreateNewBoard';
import Navbar from './Navbar';
import Board from './Board';

class Main extends Component {
  render() {
    return (
      <div className='route-wrapper'>
        <Router>
					<>
						<Navbar />
						<Switch>
							{/* <Route exact path='/' component={Header} /> */}
							<Route exact path='/' component={Dashboard} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/signup' component={Signup} />
							<Route exact path='/createboard' component={CreateNewBoard} />
							<Route exact path='/board/:bname' component={Board} />
						</Switch>
					</>
        </Router>
      </div>
    );
  }
}

export default Main;