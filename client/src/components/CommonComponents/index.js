import React from 'react';

import helperFunctions from '../../utility';
let { validateEmail, validatePassword, toProperCase } = helperFunctions;
import { Button, Alert } from 'react-bootstrap';

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
      (message || error) && (
        <div className="mt-3">
          <Alert variant="danger">{message || error}</Alert>
        </div>
      )
    );
  },

  SubmitButton: (props) => {
    const { text } = props;
    return <Button type="submit">{text}</Button>;
  },
};

export default commonComponents;
