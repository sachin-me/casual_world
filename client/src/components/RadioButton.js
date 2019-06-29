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
		const value = e.target.value;
		const text = [e.target.innerText];
		console.log(text, 'checking innerText value')
		this.setState((state) => ({
			open: false,
      inProgress: false,
      inReview: false,
      closed: false,
      [e.target.value]: true
		}))
	}

	render() {
		const { status } = this.props;
		const { open, inProgress, inReview, closed } = this.state;
		console.log(status, 'checking status in RadioButton');
		return (
			<>
				<div className="control">
				  <label className="radio">
				    <input type="radio" name="group1" value={open ? status : "open"} required onChange={this.handleChange} />
				    Open
				  </label>
				  <label className="radio">
				    <input type="radio" name="group1" value={inProgress ? status : "inProgress"} required onChange={this.handleChange} />
				    IN PROGRESS
				  </label>
				  <label className="radio">
				    <input type="radio" name="group1" value={inReview ? status : "inReview"} required onChange={this.handleChange} />
				    IN REVIEW
				  </label>
				  <label className="radio">
				    <input type="radio" name="group1" value={closed ? status : "closed"} required onChange={this.handleChange} />
				    CLOSED
				  </label>
				</div>
			</>
		)
	}
}

export default RadioButton; 