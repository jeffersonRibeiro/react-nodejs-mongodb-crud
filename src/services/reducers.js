import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import usersReducer from './users/reducer';



export default combineReducers({
  user: usersReducer,
  router: routerReducer,
});