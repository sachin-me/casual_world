import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';
import CreateCard from './CreateCard';

class Lists extends Component {
	state = {
		openInputBox: [],
		boardId: this.props.boardId
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
	componentDidMount = () => {
		const { boardId } = this.state;
		this.props.dispatch(actions.getLists(boardId));
	}
	render() {
		const { allLists } = this.props;
		const { openInputBox } = this.state;
		return (
			<>
				{
					allLists && allLists.map((list) => {
						return (
							<div key={list._id} className='add-list list-card'>
								<div>{list.listName}</div>
								<div>
									{
										(openInputBox && openInputBox.includes(list._id)) ? (
											<div className='create-card'>
												<div><CreateCard listId={list._id} /></div><span className='close-btn' onClick={() => this.handleClose(list._id)}>x</span>
											</div>
										) : (
											<div onClick={() => this.handleClick(list._id)} className=''>
												+ <span>Add a Card</span>
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
		allLists: state.allLists,
		board: state.board || {}
	}
}

export default connect(mapStateToProps)(Lists);