import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';
import Board from './Board';
import Create from './Create';

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
		if (!listName) return
		const data = { listName }
		this.setState({
			listName: ''
		})
		this.props.dispatch(actions.createList(data, success => {
			if (success) {
				this.props.dispatch(actions.getLists())
			}
		}))
	}
	render() {
		const { listName } = this.state;
		return (
			<div>
				<form action="" className='create-board-form' onSubmit={this.handleSubmit}>
					<input type="text" name='listName' value={listName} onChange={this.handleChange} />
					<input type="submit" value="Create List"/>
				</form>
			</div>
		);
	}
}

export default connect(null)(CreateList);