import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserProfileDropDown from './UserProfileDropDown';

class Profile extends Component {
	state = {
		isOpen: false
	}
	handleClick = () => {
		const { isOpen } = this.state;
		this.setState({
			isOpen: !isOpen
		})
	}
  render() {
		const { currentUser } = this.props;
		const { isOpen } = this.state;
    return (
      <div>
        <div onClick={this.handleClick}>
					{
						Object.keys(currentUser).length ? (
							<div>
								{
									currentUser.name.split(' ')[0]
								}
							</div>
						) : ''
					}
				</div>
				<div>
					{
						isOpen ? <UserProfileDropDown /> : ''
					}
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

export default connect(mapStateToProps)(Profile);