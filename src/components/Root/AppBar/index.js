import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import LogoutIcon from '@material-ui/icons/Input';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
  },
  flex: {
    flex: 1,
  },
});

class _AppBar extends Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  
  render() {
    const { classes, user } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="absolute" className={[classes.appBar, 'appBar'].join(' ')}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex} noWrap>
            CRUD
          </Typography>
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
              src=""
            >
              <Avatar alt="Remy Sharp" src={user.profile} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose} component={NavLink} to="/profile">
                Perfil
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

_AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {}),
)(_AppBar);