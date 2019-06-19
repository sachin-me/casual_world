import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';
import Board from './Board';

class CreateList extends Component {
	state = {
		listName: ''
	}
	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const { listName } = this.state;
		const data = { listName }
		this.props.dispatch(actions.createList(data, success => {
			if (success) {
				<Board />
			}
		}))
	}
	render() {
		const { listName } = this.state;
		return (
			<div>
				<form action="" onSubmit={this.handleSubmit}>
					<input type="text" name='listName' value={listName} onChange={this.handleChange} />
					<input type="submit" value="Create List"/>
				</form>
			</div>
		);
	}
}

export default connect(null)(CreateList);