import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import PublicRoutes from './Routes/PublicRoutes';
import AuthRoutes from './Routes/AuthRoutes';

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
									<AuthRoutes />
								) : (
									<PublicRoutes />
								)
							}
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