import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CreateBoard extends Component {
  render() {
		const { currentUser } = this.props;
    return (
      <>
				<Link to={`/${currentUser.id}/createboard`}>
        	<div className='hover' onClick={this.handleClick}>+<span>Create a board</span></div>
				</Link>
      </>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser || {}
	}
}

export default connect(mapStateToProps)(CreateBoard);