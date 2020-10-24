import React from 'react';
import { Route } from 'react-router-dom';
import Hero from '../Hero';
import Login from '../Login';
import Signup from '../Signup';

function PublicRoutes() {
  return (
    <>
      <Route exact path="/" component={Hero} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </>
  );
}

export default PublicRoutes;
