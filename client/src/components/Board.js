import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import CreateList from './CreateList';
import Lists from './Lists';
import actions from '../store/actions';

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
	componentDidMount = () => {
		const { match } = this.props;
		const { slug } = match.params;

		this.props.dispatch(actions.getSingleBoard(slug, (success => {
			if (success) {
				this.props.dispatch(actions.getLists(slug));
				this.props.dispatch(actions.getAllCards(slug));
			}
		})));
	}
	render() {
		const { board } = this.props;
		const { isOpen } = this.state;
		return (
			<>
				<div>
					{
						Object.keys(board).length ? (
							<div style={{ marginTop: '20px', marginLeft: '20px', }}>{board.boardName}</div>
						) : (
							<div className="main-loader">
                <Loader
                  type="Audio"
                  color="#00BFFF"
                  height={50}
                  width={50}
                  timeout={3000} //3 secs
                />
              </div>
						)
					}
				</div>
				{
					Object.keys(board).length !== 0 ? (
						<div className='create-list-wrapper'>
							<Lists boardId={board._id} boardSlug={board.slug} />
							<div>
								{
									isOpen ? (
										<div className='is-open'>
											<div><CreateList /></div><span className='close-btn' onClick={this.handleClose}>x</span>
										</div>
									) : (
											<div onClick={this.handleClick} className='add-list'>
												+ <span>Add a task</span>
											</div>
										)
								}
							</div>
						</div>
					) : (
							<div className="main-loader">
								<Loader
									type="Audio"
									color="#00BFFF"
									height={50}
									width={50}
									timeout={3000} //3 secs
								/>
							</div>
						)
				}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		board: state.board,
	}
}

export default connect(mapStateToProps)(Board);