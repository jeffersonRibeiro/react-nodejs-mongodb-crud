import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import List, { ListSubheader, ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import './style.scss';

const NavigationList = props => {
  return (
    <List 
      className="nav-link"
      component="nav"
      subheader={<ListSubheader component="div">Menu</ListSubheader>}
    >
      <ListItem component={NavLink} exact to="/" button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Ínicio" />
      </ListItem>
      <ListItem component={NavLink} exact to="/users/all" button>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Lista Usuários" />
      </ListItem>
    </List>
  );
}

export default NavigationList;