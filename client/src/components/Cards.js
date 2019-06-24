import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';

class Cards extends Component {
	state = {
		boardId: this.props.boardId
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
								<div>{card.cardName}</div>
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
		board: state.board || {}
	}
}

export default connect(mapStateToProps)(Cards);