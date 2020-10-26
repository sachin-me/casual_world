import React from 'react';

import helperFunctions from '../../utility';
let { validateEmail, validatePassword, toProperCase } = helperFunctions;
import { Button } from 'react-bootstrap';

const commonComponents = {
  InputBox: (props) => {
    const { name, type, placeholder, handleChange, onBlur } = props;
    return (
      <div className="form-group">
        <label>{toProperCase(name)}</label>
        <input
          className="form-control"
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={onBlur}
        />
      </div>
    );
  },

  Message: (props) => {
    const { message, error } = props;
    return (
      <div className="signup-status center has-text-danger">
        {message || error}
      </div>
    );
  },

  SubmitButton: (props) => {
    const { text } = props;
    return <Button type="submit">{text}</Button>;
  },
};

export default commonComponents;
