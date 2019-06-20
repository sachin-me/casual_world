import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';

class Lists extends Component {
	componentDidMount = () => {
		this.props.dispatch(actions.getLists());
	}
	render() {
		const { lists } = this.props;
		return (
			<>
				{
					lists && lists.map((list) => {
						return (
							<div key={list._id} className='add-list list-card'>{list.listName}</div>
						)
					})
				}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		lists: state.allLists
	}
}

export default connect(mapStateToProps)(Lists);