import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

const history = createHistory()

const initialState = {};

const middleware = [thunk, routerMiddleware(history)];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;