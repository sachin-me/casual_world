import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';

class BoardLists extends Component {
	state = {
		isOpen: false,
		boardName: '',
		openInputBox: []
	}
	handleClick = (boardId) => {
		this.props.dispatch(actions.getSingleBoard(boardId))
		this.props.history.push(`/board/${boardId}`)
	}

	handleDelete = (boardId) => {
		this.props.dispatch(actions.deleteBoard(boardId));
	}

	handleUpdate = (boardId) => {
		const { openInputBox } = this.state;
		let checkId = [...openInputBox, boardId];
		let lastArr = checkId.filter((val, index, arr) => arr.indexOf(val) === index);
		this.setState({
			isOpen: true,
			openInputBox: lastArr
		})
	}

	handleChange = (e) => {
		const {name, value} = e.target;
		this.setState({
			[name]: value
		})
	}

	handleSubmit = (e, boardId) => {
		e.preventDefault();
		const { boardName } = this.state;
		const data = { boardName };
		this.props.dispatch(actions.updateBoard(boardId, data, success => {
			if (success) {
				this.setState({
					isOpen: false
				})
			}
		}))
	}

	handleClose = (boardId) => {
		const { openInputBox } = this.state;
		let removeId = openInputBox.filter(val => val != boardId);
		this.setState({
			isOpen: false,
			openInputBox: removeId
		})
	}

	componentDidMount = () => {
		this.props.dispatch(actions.getBoards());
	}
	render() {
		const { boards } = this.props;
		const { isOpen, boardName, openInputBox } = this.state;
		return (
			<div>
				{
					boards.length !== 0 ? boards.map((board) => {
						return (
							<div key={board._id} className='board-card'>
								{
									isOpen && openInputBox && openInputBox.includes(board._id) ? (
										<>
											<form action="" onSubmit={(e) => this.handleSubmit(e, board._id)}>
												<input name='boardName' type="text" placeholder={board.boardName} value={boardName} onChange ={this.handleChange} />
												<span onClick={() => this.handleClose(board._id)}>x</span>
											</form>
										</>
									) : (
										<>
											<span onClick={() => this.handleClick(board._id)}>{board.boardName}</span>
											<span className='edit-icon' onClick={() => this.handleUpdate(board._id)} >
												<i className="fas fa-pencil-alt"></i>
											</span>
											<span className='trash-icon' onClick={() => this.handleDelete(board._id)} >
												<i className="fas fa-trash-alt"></i>
											</span>
										</>
									)
								}
							</div>
						)
					}) : <div className='main-loader'>Oops, no board found!</div>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		boards: state.boards || [],
	}
}

export default connect(mapStateToProps)(BoardLists);