import { USER_LOGIN } from './actionTypes';
import axios from '../axios';


export const login = formData => dispatch => {

  axios.post('/users/login', formData)
    .then(res => {
      const { name, email, profile } = res.data;
      const payload = {
        name,
        email,
        profile,
      }
      
      return dispatch({
        type: USER_LOGIN,
        payload,
      });

    })
    .catch(err => console.log(err));
}