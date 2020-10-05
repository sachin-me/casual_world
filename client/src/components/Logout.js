import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';

class Logout extends Component {
	handleLogout = () => {
		this.props.dispatch(actions.logout(success => {
			if (success) {
				window.location.href = '/login';
			}
		}));
	}
	render() {
		return (
			<div className='logout-btn'  onClick={this.handleLogout}>
				<button>Logout</button>
			</div>
		);
	}
}

export default connect(null)(Logout);