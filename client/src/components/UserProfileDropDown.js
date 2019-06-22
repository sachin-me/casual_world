import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';

class UserProfileDropDown extends Component {
	handleLogout = () => {
		this.props.dispatch(actions.logout(success => {
			if (success) {
				this.props.history.push('/');
			}
		}));
	}
	render() {
		return (
			<div className='userprofile-dropdown'>
				<div className='logout-btn'>
					<button onClick={this.handleLogout}>Logout</button>
				</div>
			</div>
		);
	}
}

export default connect(null)(UserProfileDropDown);