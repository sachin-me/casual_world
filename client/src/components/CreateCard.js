import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';

class CreateCard extends Component {
	state = {
		cardName: '',
		userId: this.props.currentUser.id,
	}
	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const { cardName } = this.state;
		const data = { cardName }
		this.props.dispatch(actions.createCard(data))
	}
	render() {
		const { cardName } = this.state;
		return (
			<>
				<form action="" className='create-card-form' onSubmit={this.handleSubmit}>
					<input type="text" name='cardName' value={cardName} onChange={this.handleChange} />
					<div>
						<input type="submit" value="Create Card"/>
					</div>
				</form>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser || {},
		board: state.board || {}
	}
}

export default connect(mapStateToProps)(CreateCard);