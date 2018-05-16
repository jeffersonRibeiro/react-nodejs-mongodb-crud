import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingLeft: 264,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

const Main = (props) => {
  const { classes, children } = props;

  return (
    <main className={[classes.content, 'content'].join(' ')}>
      <div className={[classes.toolbar, 'content-toolbar'].join(' ')} />
      {children}
    </main>
  );
}

Main.prototypes = {
  classes: PropTypes.object.isRequired,
}


export default withStyles(styles)(Main);