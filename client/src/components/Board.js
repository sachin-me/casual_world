import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateList from './CreateList';
import Lists from './Lists';

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
				<div className='create-list-wrapper'>
					<Lists />
					<div>
						{
							isOpen ? (
								<div className='is-open'>
									<div><CreateList /></div><span className='close-btn' onClick={this.handleClose}>x</span>
								</div>
							) : (
								<div onClick={this.handleClick} className='add-list'>
									+ <span>Add a list</span>
								</div>
							)
						}
					</div>
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