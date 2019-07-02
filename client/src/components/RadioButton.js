import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../store/actions';

class RadioButton extends Component {
		
	state = {
		selectedStatus: ['OPEN', 'IN PROGRESS', 'IN REVIEW', 'CLOSED']
	}

	handleChange = (e) => {

		e.persist();
		const { value } = e.target;
		const { cardId, listId } = this.props;

		const data = { value }

		this.props.dispatch(actions.updateTaskStatus(listId, cardId, data))
	}

	render() {
		const { selectedStatus } = this.state;

		return (
			<>
				<div className="control">
			  	{
			  		selectedStatus ? selectedStatus.map((taskStatus, index) => {
			  			return (
			  				<label className="radio" key={index}>
			    				<input type="radio" name="group1" value={taskStatus} required onChange={this.handleChange} />
			    				{taskStatus}
							  </label>
			  			)
			  		}) : ''
			  	}
				</div>
			</>
		)
	}
}

export default connect(null)(RadioButton); 