import React from 'react';
import Typography from 'material-ui/Typography';
import { CircularProgress, LinearProgress } from 'material-ui/Progress';

const Profile = () => (
  <React.Fragment>
    <Typography variant="subheading" color="textSecondary" noWrap>Meu Perfil</Typography>
    <br />    
    <LinearProgress color="secondary" />
    <br />
    <CircularProgress color="secondary" />
  </React.Fragment>
);

export default Profile;