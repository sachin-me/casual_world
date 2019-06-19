import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CreateNewProject from './CreateNewProject';
import CreateNewBoard from './CreateNewBoard';
import Modal from '../containers/Model';

class CreateBoard extends Component {
  state = {
    isOpen: false
  }
  handleClick = () => {
    this.setState({
      isOpen: true
    })
	}
	closeModalHandler = () => {
    this.setState({
      isOpen: false
    })
	}
  render() {
    const { isOpen } = this.state;
    return (
      <>
        <div>
          {
            isOpen ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null
          }
        </div>
				<Link to='/createboard'>
        	<div className='hover' onClick={this.handleClick}>+<span>Create a board</span></div>
				</Link>
				<Modal
					className="modal"
					show={isOpen}
					close={this.closeModalHandler} />
      </>
    );
  }
}

export default CreateBoard;