import { USER_LOGIN } from './actionTypes';

const initialState = {
  data: {
    auth: false,
    name: '',
    email: '',
    profile: '',
  }
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
    default:
      return state;
  }
}