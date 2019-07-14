import React from 'react';

import helperFunctions from "../../utility";
let {validateEmail, validatePassword, toProperCase} = helperFunctions;

const commonComponents = {
	InputBox: (props) => {
		const {name, type, placeholder, handleChange, onBlur} = props;
		return (
			<div className="field">
				<label className="label">{toProperCase(name)}</label>
				<div className="control">
					<input className="input" type={type} name={name} placeholder={placeholder} onChange={handleChange} onBlur={onBlur}/>
				</div>
			</div>
		)
	},

	Message: (props) => {
		const { message, error} = props;
	  return (
	    <div className="signup-status center has-text-danger">
	      { message || error }
	    </div>
	  )
	},

	SubmitButton: (props) => {
	  const { text } = props;
	  return (  
	    <div className="field">
	      <p className="control">
	        <button type="submit" className="button is-primary">
	          { text }
	        </button>
	      </p>
	    </div>
	  )
	}
}

export default commonComponents;