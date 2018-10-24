import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';

import NavigationList from './components/NavigationList';


const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'fixed',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
});

const SideNav = props => {
  const { classes } = props;

  return (
    <Drawer
      variant="permanent"
      className="sideNav"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />

      <NavigationList />
    
    </Drawer>
  );
}

SideNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideNav);