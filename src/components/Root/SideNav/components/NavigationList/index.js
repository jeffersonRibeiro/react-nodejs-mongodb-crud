import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import List, { ListSubheader, ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import './style.scss';

const NavigationList = (props) => {
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
        <ListItemText primary="Home" />
      </ListItem>
    </List>
  );
}

export default NavigationList;