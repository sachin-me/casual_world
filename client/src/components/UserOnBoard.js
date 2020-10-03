import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import UserBoard from './UserBoard';
import HomeIcon from '../containers/HomeIcon';
import CreateBoard from './CreateBoard';
import actions from '../store/actions';
import noContent from '../images/no-content.svg';

class UserOnBoard extends Component {
	state = {
		userId: this.props.currentUser.id
	}
	componentDidMount = () => {
		const { userId } = this.state;
		this.props.dispatch(actions.getBoards(userId));
	}
  render() {
		const { currentUser } = this.props;
		const userId = currentUser.id || ''
    return (
      <div className='columns column-wrapper'>
        <div className='column is-one-third'>
          <div className='hover'>
						<Link to={`/${userId}/getboards`}>
            	<UserBoard />
						</Link>
          </div>
          <div className='hover'>
            <Link to='/'>
              <div>
                <HomeIcon /><span className='home-span'>Home</span>
              </div>
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
              <img src={noContent} />
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

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser || {}
	}
}

export default connect(mapStateToProps)(UserOnBoard);