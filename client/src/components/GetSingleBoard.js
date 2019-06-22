import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';

class GetSingleBoard extends Component {
	componentDidMount = () => {
		this.props.dispatch(actions.getSingleBoard())
	}
	render() {
		return (
			<div>
				I am a single board
			</div>
		);
	}
}

export default connect(null)(GetSingleBoard);