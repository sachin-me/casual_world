import React from "react";
import { Route } from "react-router-dom";
import Dashboard from '../Dashboard';
import UserProfile from '../UserProfile';
import CreateNewBoard from '../CreateNewBoard';
import BoardLists from '../BoardLists';
import Board from '../Board';

function AuthRoutes() {
  return (
    <>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/:id/profile" component={UserProfile} />
      <Route exact path="/:id/createboard" component={CreateNewBoard} />
      <Route exact path="/:id/getboards" component={BoardLists} />
      <Route exact path="/:userid/board/:boardid" component={Board} />
    </>
  );
}

export default AuthRoutes;
