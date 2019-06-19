import React, { Component } from 'react';

class CreateNewBoard extends Component {

  render() {
    return (
			<>
				<form action="" className='create-board-form'>
					<input type="text" placeholder='Enter Board name' />
					<input type="submit" value="Create Board"/>
				</form>
			</>
		)
  }
}

export default CreateNewBoard;