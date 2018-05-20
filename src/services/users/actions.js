import { USER_LOGIN, USER_LOGOUT } from './actionTypes';
import { LOGIN_FAIL } from '../errors/actionTypes';

import axios from '../axios';

export const login = formData => dispatch => {
  axios.post('/users/login', formData)
    .then(res => {
      const { status, message, name, email, profile, created_date, updated_date, token } = res.data;
      
      if(status !== true) {
        return dispatch({
          type: LOGIN_FAIL,
          payload: {
            status,
            message,
          },
        })
      }

      const payload = {
        name,
        email,
        profile,
        created_date,
        updated_date,
        token,
      }

      return dispatch({
        type: USER_LOGIN,
        payload,
      });

    })
    .catch(err => console.log(err));
}

export const logout = formData => dispatch => {
  window.localStorage.removeItem('state');
  return dispatch({
    type: USER_LOGOUT,
    payload: {}
  });
}