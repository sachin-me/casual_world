import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CreateBoard extends Component {
  render() {
    return (
      <>
				<Link to={`/createboard`}>
        	<div className='hover' onClick={this.handleClick}>+<span>Create a project</span></div>
				</Link>
      </>
    );
  }
}


export default CreateBoard;