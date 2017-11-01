import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router';
import { ConnectedRouter } from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker';
import HomeContainer from "./containers/HomeContainer";
import NewPostContainer from "./containers/NewPostContainer";
import Header from "./containers/Header";
import store, { history } from "./configureStore";
import CommentContainer from "./containers/CommentContainer";

ReactDOM.render(
  <Provider store={store}>
	  <ConnectedRouter history={history}>
		  <div>
			  <Header />
			  <Switch>
				  <Route exact path="/new/:postId?" component={NewPostContainer}/>
				  <Route exact path="/:category/comment/:postId" component={CommentContainer}/>
				  <Route path="/:category?" component={HomeContainer}/>
			  </Switch>
		  </div>
	  </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
