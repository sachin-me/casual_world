import React, { Component } from 'react';
import ProjectForm from './ProjectForm';

class CreateNewProject extends Component {
	render() {
		return (
			<div className='create-new-wrapper'>
				<div className='cp'>
					<h4>Create Project</h4>	
					<p>New</p>
				</div>
				<div>
					<ProjectForm />
				</div>
				<div className='same-class'>
					<span>Lists</span>
					<span className='icon'><i className="far fa-arrow-alt-circle-right"></i></span>
				</div>
				<div className='same-class'>
					<span>Share Project With</span>
					<span className='icon'><i className="far fa-arrow-alt-circle-right"></i></span>
				</div>
				<div className='same-class'>
					<span>Task statuses</span>
					<span className='icon'><i className="far fa-arrow-alt-circle-right"></i></span>
				</div>
				<div className='create-project-btn'>
					<button>Create Project</button>
				</div>
			</div>
		);
	}
}

export default CreateNewProject;