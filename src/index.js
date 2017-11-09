import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router';
import { ConnectedRouter } from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker';
import Header from "./component/Header";
import store, { history } from "./configureStore";
import './resources/styles/css/index.css';
import Home from "./component/Home";
import Comment from "./component/Comment";
import NewPost from "./component/NewPost";

ReactDOM.render(
  <Provider store={store}>
	  <ConnectedRouter history={history}>
		  <div>
			  <Header />
			  <Switch>
				  <Route path="/new/:postId?" component={NewPost}/>
				  <Route path="/:category/comment/:postId" component={Comment}/>
				  <Route path="/:category?" component={Home}/>
			  </Switch>
		  </div>
	  </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
