import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';

class Cards extends Component {

	state = {
		boardId: this.props.boardId,
		listId: this.props.listId
	}

	handleDelete = (cardId) => {
		const { listId } = this.props;
		this.props.dispatch(actions.deleteCard(listId, cardId))
	}

	componentDidMount = () => {
		const { boardId } = this.state;
		const { listId } = this.props;
		this.props.dispatch(actions.getCards(listId));
		this.props.dispatch(actions.getAllCards(boardId));
	}

	render() {
		const { cards } = this.props;
		return (
			<div>
				{
					cards && cards.map((card) => {
						return (
							<div key={card._id} className='subtask-card'>
								<span>{card.cardName}</span>
								<span className='edit-icon'>
									<i className="fas fa-pencil-alt"></i>
								</span>
								<span className='trash-icon' onClick={() => this.handleDelete(card._id)} >
									<i className="fas fa-trash-alt"></i>
								</span>
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