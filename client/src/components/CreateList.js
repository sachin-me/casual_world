import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';

class CreateList extends Component {
	state = {
		listName: '',
		boardId: this.props.board._id
	}
	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const { listName, boardId } = this.state;
		if (!listName) return
		const data = { listName, boardId }
		this.setState({
			listName: ''
		})
		this.props.dispatch(actions.createList(data, boardId, success => {
			if (success) {
				this.props.dispatch(actions.getLists(boardId))
				this.props.dispatch(actions.getAllCards(boardId));
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

const mapStateToProps = (state) => {
	return {
		board: state.board || {}
	}
}

export default connect(mapStateToProps)(CreateList);