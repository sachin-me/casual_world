import React, { Component } from "react";
import { Link } from "react-router-dom";

class CreateBoard extends Component {
  render() {
    return (
      <>
        <Link to={`/createboard`}>
          <div onClick={this.handleClick}>
            +<span> Create a project</span>
          </div>
        </Link>
      </>
    );
  }
}

export default CreateBoard;
