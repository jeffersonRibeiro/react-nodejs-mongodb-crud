import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import { FORM_SUBMIT_FAIL } from '../../services/errors/actionTypes';
import axios from '../../services/axios';

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
});

const formSubmitFail = payload => dispatch => {
  return dispatch({
    type: FORM_SUBMIT_FAIL,
    payload,
  });
}


class Login extends Component {
  state = {
    name: '',
    email: '',
    birthDate: null,
    password: '',
    showPassword: false,
    beforeSubmitError: false,
    dialog: {
      open: false,
      title: '',
      content: '',
    }
  };

  handleRegister = event => {
    const { formSubmitFail } = this.props;
    const { name, email, birthDate, password } = event.target;
    const data = {
      name: name.value,
      email: email.value,
      birthDate: birthDate.value,
      password: password.value,
    }

    const blankInputs = Object.keys(data).filter(key => data[key] === '');
    
    if( blankInputs.length > 0 ) {
      this.setState({ beforeSubmitError: true });
    } else {
      this.setState({ beforeSubmitError: false });
      axios.post('/users/register', data)
        .then(res => {
          const { status, message } = res.data;

          if(status !== true) {
            formSubmitFail({
              status,
              message,
            });
          } else {
            this.handleOpenDialog(message, 'Agora você já pode fazer login com seu email e senha na tela inicial :D');
          }
        })
        .catch(err => console.log(err));
    }

    event.preventDefault();
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  }

  handleClickShowPassword = () => {
    this.setState(prevState => {
      return ({
        showPassword: !prevState.showPassword,
      });
    })
  }

  handleOpenDialog = (title, content) => {
    const dialog = {
      title,
      content,
      open: true,
    }
    this.setState({ dialog });
  }

  handleCloseDialog = () => {
    const dialog = {
      title: '',
      content: '',
      open: false,
    }
    this.setState({ dialog })
  }

  handleBirthDateChange = date => {
    this.setState({ birthDate: date });
  }

  render() {
    const { classes, error } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={this.handleRegister} className={classes.root}>
          {/* NAME */}
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={this.state.beforeSubmitError && this.state.name === '' ? true : false}
            aria-describedby="passowrd-error-text"
          >
            <InputLabel htmlFor="input-name">Nome Completo</InputLabel>
            <Input
              id="input-name"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange('name')}
            />
            {(this.state.beforeSubmitError && this.state.name === '') &&
              <FormHelperText id="password-error-text">Preencha o nome</FormHelperText>
            }
          </FormControl>
          {/* EMAIL */}
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={
              (error.status === 'EMAIL_ALREADY_EXISTS') || 
              (this.state.beforeSubmitError && this.state.name === '') ? true : false}
            aria-describedby="email-error-text"
          >
            <InputLabel htmlFor="input-email">Email</InputLabel>
            <Input
              id="input-email"
              name="email"
              type="email"
              placeholder="example@chaordic.com.br"
              value={this.state.email}
              onChange={this.handleChange('email')}
            />
            {((error.status === 'EMAIL_ALREADY_EXISTS') || (this.state.beforeSubmitError && this.state.name === '')) &&
              <FormHelperText id="email-error-text">{error.message || 'Preencha o email'}</FormHelperText>
            }
          </FormControl>
          {/* DATA NASCIMENTO */}
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={(this.state.beforeSubmitError && this.state.birthDate === '') ? true : false}
            aria-describedby="birthdate-error-text"
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
            {(this.state.beforeSubmitError && this.state.birthDate === '') &&
              <FormHelperText id="birthdate-error-text">Preencha a data de nascimento</FormHelperText>
            }
          </FormControl>

          {/* PASSWORD */}
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={this.state.beforeSubmitError && this.state.password === '' ? true : false}
            aria-describedby="passoword-error-text"
          >
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              name="password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {(this.state.beforeSubmitError && this.state.password === '') &&
              <FormHelperText id="password-error-text">Preencha a senha</FormHelperText>
            }
          </FormControl>
          <Button color="default" component={Link} to="/login" variant="flat" className={classes.margin}>
            <ChevronLeft className={classes.rightIcon} />
            Voltar
          </Button>
          <Button type="submit" variant="raised" color="primary" className={classes.margin}>
            Continuar
          </Button>
        </form>
        <Dialog
          open={this.state.dialog.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEnforceFocus
        >
          <DialogTitle id="alert-dialog-title">{this.state.dialog.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.dialog.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.history.replace('/login')} color="primary" autoFocus>
              Continuar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { formSubmitFail }),
)(Login);