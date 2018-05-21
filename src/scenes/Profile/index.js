import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import DatePicker from 'material-ui-pickers/DatePicker';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import { updateProfile } from '../../services/users/actions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  fill: {
    flexBasis: '100%',
  },
  dates: {
    flexBasis: '33.33%',
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    
    const { name, birthDate } = this.props.user;
    this.state = {
      name,
      birthDate, 
    };
  }
  

  handleUpdate = e => {
    const { user, updateProfile } = this.props;
    const { name, birthDate } = e.target;
    const formData = {
      name: name.value,
      birthDate: birthDate.value,
    }

    updateProfile(formData, user.token);

    e.preventDefault();
  }

  handleChange = prop => e => {
    this.setState({ [prop]: e.target.value });
  }

  handleBirthDateChange = (date) => {
    this.setState({ birthDate: date });
  }

  render() {
    const { classes, user } = this.props;
    
    return (
      <React.Fragment>
        <Typography variant="subheading" color="textSecondary" noWrap>
          Meu Perfil
        </Typography>
        <form onSubmit={this.handleUpdate} className={classes.root}>
          {/* NAME */}
          <FormControl className={[classes.margin, classes.fill].join(' ')}>
            <InputLabel htmlFor="input-name">Nome Completo</InputLabel>
            <Input
              id="input-name"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange('name')}
            />
          </FormControl>
          {/* EMAIL */}
          <FormControl className={[classes.margin, classes.fill].join(' ')}>
            <InputLabel htmlFor="input-email">Email</InputLabel>
            <Input
              id="input-email"
              type="text"
              disabled={true}
              value={user.email}
            />
          </FormControl>
          {/* BIRTH DATE */}
          <FormControl className={[classes.dates, classes.margin].join(' ')}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                keyboard
                name="birthDate"
                label="Data de nascimento"
                format="DD/MM/YYYY"
                placeholder="15/03/1993"
                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                value={this.state.birthDate}
                onChange={this.handleBirthDateChange}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          {/* CREATED DATE */}
          <FormControl className={[classes.dates, classes.margin].join(' ')}>
            <InputLabel htmlFor="input-created-date">Criado em</InputLabel>
            <Input
              id="input-created-date"
              type="text"
              disabled={true}
              value={user.createdDate}
            />
          </FormControl>
          {/* UPDATED DATE */}
          <FormControl className={[classes.dates, classes.margin].join(' ')}>
            <InputLabel htmlFor="input-updated-date">Atualizado em</InputLabel>
            <Input
              id="input-updated-date"
              type="text"
              disabled={true}
              value={user.updatedDate}
            />
          </FormControl>
          <Button type="submit" variant="raised" color="primary" className={classes.margin}>
            Atualizar
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { updateProfile }),
)(Profile);