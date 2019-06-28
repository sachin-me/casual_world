import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';

class CreateCard extends Component {
	state = {
		cardName: '',
		dueDate: '',
		currentDate: new Date(),
		userId: this.props.currentUser.id,
		boardId: this.props.board._id,
		listId: this.props.listId
	}
	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}
	handleSubmit = (e) => {

		e.preventDefault();

		const { currentUser } = this.props;
		const { cardName, dueDate, boardId, listId } = this.state;

		if (!cardName || !dueDate) return

		const data = { cardName, dueDate }
		this.setState({
			cardName: '',
			dueDate: ''
		})

		this.props.dispatch(actions.createCard(data, currentUser.id, boardId, listId, success => {
			if (success) {
				this.props.dispatch(actions.getCards(listId))
				this.props.dispatch(actions.getAllCards(boardId));
			}
		}))
	}
	render() {
		const { cardName, dueDate, currentDate } = this.state;
		return (
			<>
				<form action="" className='create-card-form' onSubmit={this.handleSubmit}>
					<input type="text" name='cardName' value={cardName} onChange={this.handleChange} />
					<input type="datetime-local" name="dueDate" value={dueDate} min={getTodayDate(currentDate)} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" onChange={this.handleChange} required />
					<div>
						<input type="submit" value="Create Subtask"/>
					</div>
				</form>
			</>
		);
	}
}

function getTodayDate(date) {

	let dd = date.getDate();
	if (dd < 10) {
		dd = `0${dd}`;
	}

	let mm = date.getMonth() + 1;
	if (mm < 10) {
		mm = `0${mm}`;
	}

	let hh = date.getHours();
	if (hh < 10) {
		hh = `0${hh}`;
	}

	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	let years = date.getFullYear();

	const todayDate = `${years}-${mm}-${dd}T${hh}:${minutes}`;
	return todayDate;	
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser || {},
		board: state.board || {}
	}
}

export default connect(mapStateToProps)(CreateCard);