import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import getRoutes from '../../routes';
import { withStyles } from 'material-ui/styles';
import Main from './Main';
import SideNav from './SideNav';
import AppBar from './AppBar';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
});

class Root extends Component {

  render() {
    const { classes, user } = this.props;

    return (
      <div className={classes.root}>
        {user.auth &&
          <React.Fragment>
            <AppBar />
            <SideNav />
          </React.Fragment>
        }
        <Main>
          { getRoutes() }
        </Main>
      </div>
    );
  }
}

Root.proptypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user.data,
});

export default withRouter(
  compose(
    withStyles(styles),
    connect(mapStateToProps, {}),
  )(Root)
);