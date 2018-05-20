import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => user.auth ? <Component {...props} /> : <Redirect to="/login" />}
    />
  );
}

const mapStateToProps = state => ({
  user: state.user.data,
});

export default withRouter(connect(mapStateToProps, {})(PrivateRoute));