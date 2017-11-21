import React, {Component} from 'react';
import Header from "./Header";
import {Route, Switch, withRouter} from "react-router-dom";
import NewPost from "./NewPost";
import Home from "./Home";
import Comment from "./Comment";
import {fetchCategories} from "../actions/categoryActions";
import {connect} from "react-redux";

/**
 * Root component of the application
 */
class App extends Component {
	componentDidMount(){
		// we need to fetch the categories to fill our category select
		this.props.requestCategories();
	}

	render(){
		return (
		  <div>
			  <Header />
			  <Switch>
				  <Route path="/new/:postId?" component={NewPost}/>
				  <Route path="/:category/:postId" component={Comment}/>
				  <Route path="/:category?" component={Home}/>
			  </Switch>
		  </div>
		)
	}
}

function mapDispatchToProps(dispatch){
	return {
		requestCategories: () => dispatch(fetchCategories())
	}
}
export default withRouter(connect(null, mapDispatchToProps)(App));