import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';

class CreateNewBoard extends Component {
	state = {
		boardName: '',
		dueDate: ''
	}
	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const { boardName, dueDate } = this.state;
		const data = { boardName, dueDate }
		this.props.dispatch(actions.createBoard(data, success => {
			if (success) {
				this.props.history.push(`/board/${boardName}`);
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

export default connect(null)(CreateNewBoard);