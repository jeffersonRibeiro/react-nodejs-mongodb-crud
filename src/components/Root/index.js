import React from 'react';
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

const Root = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar />
      <SideNav />
      <Main>
        { getRoutes() }
      </Main>
    </div>
  );
}

Root.proptypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Root);