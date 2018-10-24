import { USER_LOGIN, UPDATE_PROFILE, USER_LOGOUT } from './actionTypes';
import { FORM_SUBMIT_FAIL } from '../errors/actionTypes';

import axios from '../axios';

export const login = formData => dispatch => {
  axios.post('/users/login', formData)
    .then(res => {
      const {
        status,
        message,
        name,
        email,
        profile,
        birthDate,
        createdDate,
        updatedDate,
        token
      } = res.data;
      
      if(status !== true) {
        return dispatch({
          type: FORM_SUBMIT_FAIL,
          payload: {
            status,
            message,
          },
        });
      }

      const payload = {
        name,
        email,
        profile,
        birthDate,
        createdDate,
        updatedDate,
        token,
      }

      return dispatch({
        type: USER_LOGIN,
        payload,
      });

    })
    .catch(err => console.log(err));
}

export const updateProfile = (formData, token) => dispatch => {
  const config = {
    headers: {
      'Authorization': token,
    }
  };

  axios.put('/users/update', formData, config)
  .then(res => {
    const {
      name,
      email,
      profile,
      birthDate,
      createdDate,
      updatedDate,
      token
    } = res.data;

    const payload = {
      name,
      email,
      profile,
      birthDate,
      createdDate,
      updatedDate,
      token,
    }

    return dispatch({
      type: UPDATE_PROFILE,
      payload,
    });

  })
  .catch(err => console.log(err));
      
}

export const logout = () => dispatch => {
  window.localStorage.removeItem('state');
  return dispatch({
    type: USER_LOGOUT,
    payload: {}
  });
}