import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import ls from './localstorage';

const initialState = JSON.parse(ls().get()) || {};
const middleware = [thunk]; 

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  ls().persist(JSON.stringify(store.getState()));
});

export default store;