import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';
import RadioButton from './RadioButton';

class Cards extends Component {

	state = {
		boardId: this.props.boardId,
		listId: this.props.listId,
		isOpen: false,
		listName: '',
		openCardBox: [],
		openRadioButtons: []
	}

	handleDelete = (cardId) => {
		const { listId } = this.props;
		this.props.dispatch(actions.deleteCard(listId, cardId))
	}

	handleUpdate = (cardId) => {
		const { openCardBox } = this.state;
		let checkId = [...openCardBox, cardId];
		let lastCardArr = checkId.filter((val, index, arr) => arr.indexOf(val) === index);
		this.setState({
			isOpen: true,
			openCardBox: lastCardArr
		})
	}

	handleCardClose = (id) => {
		const { openCardBox } = this.state;
		let removeListId = openCardBox.filter(val => val != id);
		this.setState({
			openCardBox: removeListId
		})
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	handleSubmit = (e, cardId) => {
		e.preventDefault();
		const { listId } = this.props;
		const { cardName } = this.state;
		const data = { cardName };
		this.props.dispatch(actions.updateCard(listId, cardId, data, success => {
			if (success) {
				this.setState({
					isOpen: false
				})
			}
		}))
	}

	handleClick = (cardId) => {
		const { openRadioButtons } = this.state;
		let checkId = [...openRadioButtons, cardId];
		let radioBtnArr = checkId.filter((val, index, arr) => arr.indexOf(val) === index);
		this.setState({
			isOpen: true,
			openRadioButtons: radioBtnArr
		})
	}

	handleClose = (cardId) => {
		const { openRadioButtons } = this.state;
		let removeId = openRadioButtons.filter(val => val != cardId);
		this.setState({
			isOpen: false,
			openRadioButtons: removeId
		})
	}

	componentDidMount = () => {
		const { boardId } = this.state;
		const { listId } = this.props;
		this.props.dispatch(actions.getCards(listId));
		this.props.dispatch(actions.getAllCards(boardId));
	}

	render() {
		const { cards } = this.props;
		const { openCardBox, openRadioButtons, isOpen, cardName } = this.state;
		return (
			<div>
				{
					cards && cards.map((card) => {
						return (
							<div key={card._id} className='subtask-card'>
								{
									isOpen && openCardBox && openCardBox.includes(card._id) ? (
										<>
											<form action=""  onSubmit={(e) => this.handleSubmit(e, card._id)}>
												<input name='cardName' type="text" placeholder={card.cardName} value={cardName} onChange={this.handleChange} />
												<span onClick={() => this.handleCardClose(card._id)}>x</span>
											</form>
										</>
									) : (
										<>
											<div className='radio-btn-wrapper'>
												{
													(isOpen && openRadioButtons && openRadioButtons.includes(card._id)) ? (
														<div className='modal is-active is-clipped'>
															<div className="modal-background" onClick={() => this.handleClose(card._id)}></div>
															<div className='modal-content'>
																<RadioButton status={card.status} />
															</div>
															<button className="modal-close is-large" aria-label="close" onClick={() => this.handleClose(card._id)} ></button>
														</div>
													) : (
														<div onClick={() => this.handleClick(card._id)} >
														  Add task status
														</div>
													)	
												}	
											</div>
											<div>
												<span>{card.cardName}</span>
												<span className='edit-icon' onClick={() => this.handleUpdate(card._id)}>
													<i className="fas fa-pencil-alt"></i>
												</span>
												<span className='trash-icon' onClick={() => this.handleDelete(card._id)} >
													<i className="fas fa-trash-alt"></i>
												</span>
											</div>
										</>									
									)
								}
							</div>
						)
					})
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		// cards: state.cards.cards || [],
		board: state.board || {},
	}
}

export default connect(mapStateToProps)(Cards);