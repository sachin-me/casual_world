import React from 'react';
import CreateNewBoard from '../components/CreateNewBoard';

const Modal = (props) => {
	return (
		<div>
			<div className="modal-wrapper"
				style={{
					transform: props.show ? 'translate(-50%,-50%)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0'
				}}>
				<div className="modal-header">
					<h3>Create Board</h3>
					<span className="close-modal-btn" onClick={props.close}>×</span>
				</div>
				<div className="modal-body">
					<div>
						<CreateNewBoard />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal;