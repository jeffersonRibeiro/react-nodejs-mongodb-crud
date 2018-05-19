import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  toolbar: theme.mixins.toolbar,
  logged: {
    paddingLeft: 264,
  },
  notLogged: {
    maxWidth: '400px',
    margin: '0 auto',
  }
});

class Main extends Component  {
  state = {
    auth: false,
  }

  render() {
    const { classes, children } = this.props;
    
    return (
      <main className={[classes.content, 'content', !!this.state.auth ? classes.logged : classes.notLogged].join(' ')}>
        <div className={[classes.toolbar, 'content-toolbar'].join(' ')} />
        {children}
      </main>
    );
  }
}

Main.prototypes = {
  classes: PropTypes.object.isRequired,
}


export default withStyles(styles)(Main);