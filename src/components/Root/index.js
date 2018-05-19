import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  state = {
    auth: false,
  }

  render() {
    const { classes } = this.props;
    const { auth } = this.state;

    return (
      <div className={classes.root}>
        {!!auth &&
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
}

export default withStyles(styles)(Root);