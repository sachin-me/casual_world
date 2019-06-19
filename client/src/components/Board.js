import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateList from './CreateList';

class Board extends Component {
	state = {
		isOpen: false
	}
	handleClick = () => {
		this.setState({
			isOpen: true
		})
	}
	handleClose = () => {
		this.setState({
			isOpen: false
		})
	}
	render() {
		const { board } = this.props;
		const { isOpen } = this.state;
		return (
			<>
				<div>
					{
						Object.keys(board).length ? (
							<div>{board.boardName}</div>
						) : null
					}
				</div>
				<div>
					{
						isOpen ? (
							<>
								<div><CreateList /></div><span onClick={this.handleClose}>x</span>
							</>
						) : (
							<div onClick={this.handleClick}>
								+ <span>Add a list</span>
							</div>
						)
					}
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		board: state.board
	}
}

export default connect(mapStateToProps)(Board);