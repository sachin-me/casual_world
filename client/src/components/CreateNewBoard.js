import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';

class CreateNewBoard extends Component {
	state = {
		boardName: '',
		dueDate: '',
		userId: this.props.currentUser.id
	}
	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const { boardName, dueDate, userId } = this.state;
		const data = { boardName, dueDate, userId }
		this.props.dispatch(actions.createBoard(data, userId, success => {
			if (success) {
				this.props.history.push(`/${userId}/getboards`);
			} else {
				this.props.history.push('/');
			}
		}));
	}
  render() {
		const { boardName, dueDate } = this.state;
    return (
			<>
				<form action="" className='create-board-form' onSubmit={this.handleSubmit}>
					<input type="text" name='boardName' value={boardName} placeholder='Enter Board name' onChange={this.handleChange} />
					<input type="datetime-local" name="dueDate" value={dueDate} id="" onChange={this.handleChange} />
					<input type="submit" value="Create Board"/>
				</form>
			</>
		)
  }
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser || {}
	}
}

export default connect(mapStateToProps)(CreateNewBoard);