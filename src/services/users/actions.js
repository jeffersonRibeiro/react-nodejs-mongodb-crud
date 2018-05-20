import { USER_LOGIN } from './actionTypes';
import axios from '../axios';


export const login = formData => dispatch => {

  axios.post('/users/login', formData)
    .then(res => {
      const { name, email, profile, created_date, updated_date } = res.data;
      const payload = {
        name,
        email,
        profile,
        created_date,
        updated_date,
      }
      
      return dispatch({
        type: USER_LOGIN,
        payload,
      });

    })
    .catch(err => console.log(err));
}