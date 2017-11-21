import React, {Component} from 'react';
import Header from "./header/Header";
import {Route, Switch, withRouter} from "react-router-dom";
import NewPost from "./post/NewPost";
import Home from "./home/Home";
import Comment from "./comment/Comment";
import {fetchCategories} from "../actions/category/categoryActions";
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