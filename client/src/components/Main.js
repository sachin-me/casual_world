import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './Login';
import Header from './Header';
import Signup from './Signup';
import Dashboard from './Dashboard';
import CreateNewBoard from './CreateNewBoard';
import Navbar from './Navbar';
import Board from './Board';
import BoardLists from './BoardLists';
import UserProfile from './UserProfile';

class Main extends Component {
  render() {
		const { currentToken } = this.props;
		const token = currentToken.split('Bearer')[1];
    return (
      <div className='route-wrapper'>
        <Router>
					<>
						<Navbar />
						<Switch>
							{
								token ? (
									<Route exact path='/' component={Dashboard} />
								) : (
									<Route exact path='/' component={Header} />
								)
							}
							<Route exact path='/login' component={Login} />
							<Route exact path='/signup' component={Signup} />
							<Route exact path='/:id/profile' component={UserProfile} />
							<Route exact path='/:id/createboard' component={CreateNewBoard} />
							<Route exact path='/:id/getboards' component={BoardLists} />
							<Route exact path='/:userid/board/:boardid' component={Board} />
						</Switch>
					</>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
		currentToken: state.currentToken || ''
	}
}

export default connect(mapStateToProps)(Main);