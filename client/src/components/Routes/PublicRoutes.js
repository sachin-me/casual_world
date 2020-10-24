import React from 'react';
import { Route } from 'react-router-dom';
import Hero from '../PublicRoutes/Hero';
import Login from '../PublicRoutes/Login';
import Signup from '../PublicRoutes/Signup';

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
