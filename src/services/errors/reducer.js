import { LOGIN_FAIL } from './actionTypes';

const initialState = {
  status: '',
  message: '',
}

export default function(state = initialState, action){
  switch(action.type){
    case LOGIN_FAIL:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}