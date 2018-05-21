import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './scenes/components/PrivateRoute';
import asyncComponent from './scenes/components/hoc/asyncComponent';

const Home = from('./scenes/Home');
const Login = from('./scenes/Login');
const Register = from('./scenes/Register');
const Profile = from('./scenes/Profile');
const Users = from('./scenes/Users');

function from(path) {
  return asyncComponent(() => {
    return import(`${path}/index.js`);
  });
}

export default () => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <PrivateRoute path="/profile" component={Profile} />
    <PrivateRoute path="/users/all" component={Users} />
    <Redirect exact path="/users" to="/users/all" />
    <Route render={() => <Redirect to="/" />} />
  </Switch>
);