import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import store, { history } from "./store/index";
import './resources/styles/css/index.css';
import App from "./component/App";

ReactDOM.render(
  <Provider store={store}>
	  <ConnectedRouter history={history}>
			<App />
	  </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
