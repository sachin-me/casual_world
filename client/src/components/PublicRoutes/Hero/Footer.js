import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
export default function (props) {
  return (
    <Navbar fixed="bottom">
      <div className="mx-auto">
        <Nav className="mr-auto">
          <p className="mt-2">Created by</p>{' '}
          <Nav.Link href="https://github.com/sachin-me/">Sachin</Nav.Link>
          <p className="mt-2">. The source code is licensed </p>
          <Nav.Link href="http://opensource.org/licenses/mit-license.php">
            MIT
          </Nav.Link>
          <p className="mt-2">. The website content is licensed </p>{' '}
          <Nav.Link href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            CC BY NC SA 4.0
          </Nav.Link>
          <p className="mt-2">.</p>
        </Nav>
      </div>
    </Navbar>
  );
}
