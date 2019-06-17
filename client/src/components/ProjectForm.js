import React, { Component } from 'react';

class ProjectForm extends Component {
	render() {
		return (
			<>
				<form action="" method="post">
					<label htmlFor="">Project Name</label>
					<input type="text" placeholder='Enter Project name' />
				</form>
			</>
		);
	}
}

export default ProjectForm;