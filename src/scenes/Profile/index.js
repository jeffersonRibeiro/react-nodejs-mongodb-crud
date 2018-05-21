import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

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

class Profile extends Component {
  state = {
    name: this.props.user.name,
  };

  handleRegister = e => {
    const { name } = e.target;
    const data = {
      name: name.value,
    }
    
    /* Request here */

    e.preventDefault();
  }

  handleChange = prop => e => {
    this.setState({ [prop]: e.target.value });
  }

  render() {
    const { classes, user } = this.props;
    
    return (
      <React.Fragment>
        <Typography variant="subheading" color="textSecondary" noWrap>
          Meu Perfil
        </Typography>
        <form onSubmit={this.handleRegister} className={classes.root}>
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
          {/* CREATED DATE */}
          <FormControl className={[classes.margin].join(' ')}>
            <InputLabel htmlFor="input-created-date">Criado em</InputLabel>
            <Input
              id="input-created-date"
              type="text"
              disabled={true}
              value={user.createdDate}
            />
          </FormControl>
          {/* UPDATED DATE */}
          <FormControl className={[classes.margin].join(' ')}>
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
  connect(mapStateToProps, {}),
)(Profile);