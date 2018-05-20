import { USER_LOGIN, USER_LOGOUT } from './actionTypes';

const initialState = {
  data: {
    auth: false,
    name: '',
    email: '',
    profile: '',
    created_date: '',
    updated_date: '',
    token: '',
  },
}

export default function(state = initialState, action){
  switch(action.type){
    case USER_LOGIN:
      return {
        ...state,
        data: {
          auth: true,
          ...action.payload,
        }
      }
    case USER_LOGOUT:
    return {
      ...state,
      data: {
        auth: false,
        ...action.payload,
      }
    }
    default:
      return state;
  }
}