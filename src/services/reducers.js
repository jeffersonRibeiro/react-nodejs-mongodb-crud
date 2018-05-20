import { combineReducers } from 'redux';
import usersReducer from './users/reducer';



export default combineReducers({
  user: usersReducer,
});