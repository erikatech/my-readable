import {createStore, applyMiddleware, compose} from 'redux';

import createHistory from 'history/createBrowserHistory';

import thunkMiddleware from 'redux-thunk';

import { routerMiddleware} from 'react-router-redux'

import reducer from '../reducers/index';

export const history = createHistory();

const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = [];

const middleware = [
	thunkMiddleware,
	routerMiddleware(history)
];

const composedEnhancers = composeEnhancers(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  reducer,
  initialState,
  composedEnhancers
);

export default store;
