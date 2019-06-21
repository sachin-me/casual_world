import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';

class BoardLists extends Component {
	handleClick = (boardId) => {
		const { id } = this.props.currentUser;
		const userId = id;
		this.props.dispatch(actions.getSingleBoard(userId, boardId))
		this.props.history.push(`/${userId}/board/${boardId}`)
	}
	componentDidMount = () => {
		const { id } = this.props.currentUser;
		this.props.dispatch(actions.getBoards(id));
	}
	render() {
		const { boards } = this.props;
		return (
			<div>
				{
					boards && boards.map((board) => {
						return (
							<div key={board._id} className='board-card' onClick={() => this.handleClick(board._id)}>{board.boardName}</div>
						)
					})
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		boards: state.boards,
		currentUser: state.currentUser
	}
}

export default connect(mapStateToProps)(BoardLists);