import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';
import CreateCard from './CreateCard';
import Cards from './Cards';

class Lists extends Component {
	state = {
		isOpen: false,
		listName: '',
		openInputBox: [],
		openListBox: [],
		boardId: this.props.boardId,
		boardSlug: this.props.boardSlug
	}

	handleClick = (id) => {
		const { openInputBox } = this.state;
		let checkId = [...openInputBox, id]
		let lastArr = checkId.filter((val, index, arr) => arr.indexOf(val) === index);
		this.setState({
			openInputBox: lastArr
		})
	}

	handleClose = (id) => {
		const { openInputBox } = this.state;
		let removeId = openInputBox.filter(val => val != id);
		this.setState({
			openInputBox: removeId
		})
	}

	handleListClose = (id) => {
		const { openListBox } = this.state;
		let removeListId = openListBox.filter(val => val != id);
		this.setState({
			openListBox: removeListId
		})
	}

	handleUpdate = (listId) => {
		const { openListBox } = this.state;
		let checkId = [...openListBox, listId];
		let lastListArr = checkId.filter((val, index, arr) => arr.indexOf(val) === index);
		this.setState({
			isOpen: true,
			openListBox: lastListArr
		})
	}	

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	handleSubmit = (e, listId) => {
		e.preventDefault();
		const { boardId, listName } = this.state;
		const data = { listName };
		this.props.dispatch(actions.updateList(boardId, listId, data, success => {
			if (success) {
				this.setState({
					isOpen: false
				})
			}
		}))
	}

	handleDelete = (listId) => {
		const { boardId } = this.props;
		this.props.dispatch(actions.deleteList(boardId, listId))
	}

	componentDidMount = () => {
		const { boardSlug } = this.state;

		this.props.dispatch(actions.getLists(boardSlug));
		this.props.dispatch(actions.getAllCards(boardSlug));
	}
	render() {
		const { boardId, board } = this.props;
		const { openInputBox, isOpen, openListBox, listName } = this.state;
		
		const { lists } = board;

		return (
			<>
				{
					lists && lists.map((list) => {
						return (
							<div key={list._id} className='add-list list-card'>
								{
									isOpen && openListBox && openListBox.includes(list._id) ? (
										<>
											<form action="" onSubmit={(e) => this.handleSubmit(e, list._id)} >
												<input name='listName' type="text" placeholder={list.listName} value={listName} onChange={this.handleChange} />
												<span onClick={() => this.handleListClose(list._id)}>x</span>
											</form>
										</>
									) : (
										<div className='list-info-wrapper'>
											<span>{list.listName}</span>
											<span className='edit-icon' onClick={() => this.handleUpdate(list._id)}>
												<i className="fas fa-pencil-alt"></i>
											</span>
											<span className='trash-icon' onClick={() => this.handleDelete(list._id)} >
												<i className="fas fa-trash-alt"></i>
											</span>
										</div>
									)
								}
								<div>
									<Cards cards={list.cards} listId={list._id} boardId={boardId} />
								</div>
								<div>
									{
										(openInputBox && openInputBox.includes(list._id)) ? (
											<div className='create-card'>
												<div><CreateCard listId={list._id} /></div><span className='close-btn' onClick={() => this.handleClose(list._id)}>x</span>
											</div>
										) : (
											<div onClick={() => this.handleClick(list._id)} className=''>
												+ <span>Add a subtask</span>
											</div>
										)
									}
								</div>
							</div>
						)
					})
				}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		board: state.board || {},
	}
}

export default connect(mapStateToProps)(Lists);