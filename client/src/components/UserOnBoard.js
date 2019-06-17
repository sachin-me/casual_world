import React, { Component } from 'react';
import { Link } from "react-router-dom";
import UserBoard from './UserBoard';
import HomeIcon from '../containers/HomeIcon';
import CreateBoard from './CreateBoard';

class UserOnBoard extends Component {
  render() {
    return (
      <div className='columns column-wrapper'>
        <div className='column is-one-third'>
          <div className='hover'>
            <UserBoard />
          </div>
          <div className='hover'>
            <Link to='/'>
              <HomeIcon /><span className='home-span'>Home</span>
            </Link>
          </div>
          <div className='create-team-wrapper'>
            <h4>Teams</h4>
            <div className='hover'>
              <span>+</span><span className='create-team-span'>Create a team</span>
            </div>
          </div>
        </div>
        <div className='column is-one-third'>
          <div className='image-info'>
            <figure className='image'>
              <img src={require('../images/no-content.svg')} />
            </figure>
            <h4>Stay on track and up to date</h4>
            <p>Invite people to boards and cards, add due dates, and we'll show the most important activity here.</p>
          </div>
        </div>
        <div className='column is-one-third board-link'>
          <h5>LINKS</h5>
          <CreateBoard />
        </div>
      </div>
    );
  }
}

export default UserOnBoard;