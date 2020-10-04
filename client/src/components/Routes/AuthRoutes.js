import React from "react";
import { Route } from "react-router-dom";
import Dashboard from '../Dashboard';
import UserProfile from '../UserProfile';
import CreateNewBoard from '../CreateNewBoard';
import BoardLists from '../BoardLists';
import Board from '../Board';
import api from '../../utility/api';

function AuthRoutes() {
  return (
    <>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/profile" component={UserProfile} />
      <Route exact path="/createboard" component={CreateNewBoard} />
      <Route exact path="/getboards" component={BoardLists} />
      <Route exact path="/board/:slug" component={Board} />
    </>
  );
}

export default AuthRoutes;
