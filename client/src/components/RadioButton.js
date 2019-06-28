import React, { Component } from 'react';

class RadioButton extends Component {
		
	state = {
		open: false,
		inProgress: false,
		inReview: false,
		closed: false,
		group1: false
	}

	handleChange = (e) => {
		e.persist();
		console.log(e.target.value, 'checking target value')
		const value = e.target.value;
		this.setState((state) => ({
			open: false,
      inProgress: false,
      inReview: false,
      closed: false,
      [e.target.value]: true
		}))
	}

	render() {
		return (
			<>
				<div className="control">
				  <label className="radio">
				    <input type="radio" name="group1" value="open" required onChange={this.handleChange} />
				    Open
				  </label>
				  <label className="radio">
				    <input type="radio" name="group1" value="inProgress" required onChange={this.handleChange} />
				    IN PROGRESS
				  </label>
				  <label className="radio">
				    <input type="radio" name="group1" value="inReview" required onChange={this.handleChange} />
				    IN REVIEW
				  </label>
				  <label className="radio">
				    <input type="radio" name="group1" value="closed" required onChange={this.handleChange} />
				    CLOSED
				  </label>
				</div>
			</>
		)
	}
}

export default RadioButton; 