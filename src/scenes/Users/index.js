import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import Typography from 'material-ui/Typography';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';

import axios from '../../services/axios';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Users extends Component {
  state = {
    userList: [],
  }

  componentDidMount() {
    const { user } = this.props;
    const config = {
      headers: {
        'Authorization': user.token,
      }
    };

    axios.get('/users/all', config)
      .then(res => {
        this.setState({ userList: res.data });
      });
  }

  render() {
    const { classes } = this.props;
    const { userList } = this.state;

    return (
      <React.Fragment>
        <Typography variant="subheading" color="textSecondary" noWrap>Lista de Usuários</Typography>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>
                  {!userList.length &&
                    <LinearProgress color="secondary" />
                  }
                </TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Criado em</TableCell>
                <TableCell>Data Nascimento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map(u => {
                return (
                  <TableRow key={u._id}>
                    <TableCell>
                      <Avatar alt={u.name} src={u.profile} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {u.name}
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    
                    <TableCell>{moment(u.createdDate).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                    <TableCell>{moment(u.birthDate).format('DD/MM/YYYY')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {}),
)(Users);