import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateList from './CreateList';
import Lists from './Lists';
import actions from '../store/actions';

class Board extends Component {
	state = {
		isOpen: false
	}
	handleClick = () => {
		this.setState({
			isOpen: true
		})
	}
	handleClose = () => {
		this.setState({
			isOpen: false
		})
	}
	componentDidMount = () => {
		const { currentUser, match } = this.props;
		const userId = currentUser.id;
		const boardId = match.params.boardid;
		this.props.dispatch(actions.getSingleBoard(userId, boardId));
		this.props.dispatch(actions.getLists(boardId));
	}
	render() {
		const { board } = this.props;
		const { isOpen } = this.state;
		return (
			<>
				<div>
					{
						Object.keys(board).length ? (
							<div>{board.boardName}</div>
						) : null
					}
				</div>
				<div className='create-list-wrapper'>
					<Lists boardId={board._id} />
					<div>
						{
							isOpen ? (
								<div className='is-open'>
									<div><CreateList /></div><span className='close-btn' onClick={this.handleClose}>x</span>
								</div>
							) : (
								<div onClick={this.handleClick} className='add-list'>
									+ <span>Add a list</span>
								</div>
							)
						}
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		board: state.board,
		currentUser: state.currentUser
	}
}

export default connect(mapStateToProps)(Board);