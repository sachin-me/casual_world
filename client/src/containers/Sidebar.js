import React from 'react';
import { Link } from 'react-router-dom';
import UserBoard from './UserBoard';
import HomeIcon from './HomeIcon';

const Sidebar = () => {
  return (
    <>
      <div>
        <Link to={`/boards`}>
          <UserBoard />
        </Link>
      </div>
      <div>
        <Link to="/">
          <div>
            <HomeIcon /> <span>Home</span>
          </div>
        </Link>
      </div>
      <div>
        <h4>Teams</h4>
        <div>
          <span>+</span> <span>Create a team</span>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
