import { combineReducers } from 'redux';
import usersReducer from './users/reducer';
import errorsReducer from './errors/reducer';


export default combineReducers({
  user: usersReducer,
  error: errorsReducer,
});