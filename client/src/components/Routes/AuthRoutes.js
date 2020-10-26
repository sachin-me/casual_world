import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../Dashbord/index';
import UserProfile from '../UserProfile';
import CreateNewBoard from '../CreateNewBoard';
import BoardLists from '../BoardLists';
import Board from '../Board';

function AuthRoutes() {
  return (
    <>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/profile" component={UserProfile} />
      <Route exact path="/createboard" component={CreateNewBoard} />
      <Route exact path="/boards" component={BoardLists} />
      <Route exact path="/board/:slug" component={Board} />
    </>
  );
}

export default AuthRoutes;
