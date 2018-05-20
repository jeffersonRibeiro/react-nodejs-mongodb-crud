import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
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
  render() {
    const { classes, children, user } = this.props;
    
    return (
      <main className={[classes.content, 'content', user.auth ? classes.logged : classes.notLogged].join(' ')}>
        <div className={[classes.toolbar, 'content-toolbar'].join(' ')} />
        {children}
      </main>
    );
  }
}

Main.prototypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user.data,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {}),
)(Main);