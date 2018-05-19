import React from 'react';
import { Route, Switch } from 'react-router-dom';

import asyncComponent from './scenes/components/hoc/asyncComponent';

const Home = from('./scenes/Home');
const Login = from('./scenes/Login');
const Register = from('./scenes/Register');
const Profile = from('./scenes/Profile');

function from(path) {
  return asyncComponent(() => {
    return import(`${path}/index.js`);
  });
}


export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/profile" component={Profile} />
  </Switch>
)