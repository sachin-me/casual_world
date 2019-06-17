import React, { Component } from 'react';
import CreateNewProject from './CreateNewProject';

class CreateBoard extends Component {
  state = {
    isOpen: false
  }
  handleClick = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    })
  }
  render() {
    const { isOpen } = this.state;
    return (
      <>
        <div>
          {
            isOpen ? <CreateNewProject /> : ''
          }
        </div>
        <div className='hover' onClick={this.handleClick}>+<span>Create a board</span></div>
      </>
    );
  }
}

export default CreateBoard;