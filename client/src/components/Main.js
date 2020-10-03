import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import PublicRoutes from './Routes/PublicRoutes';
import AuthRoutes from './Routes/AuthRoutes';

class Main extends Component {
	render() {
		const { currentUser } = this.props;
		const id = currentUser._id;
		
		return (
			<div className='route-wrapper'>
				<Router>
					<>
						<Navbar />
						<Switch>
							{
								id ? (
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
	}
}

export default connect(mapStateToProps)(Main);