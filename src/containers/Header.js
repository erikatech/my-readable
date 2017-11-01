import React, { Component } from 'react';
import CategoryListContainer from "./CategoryListContainer";
import {withRouter} from 'react-router';
import {Link} from "react-router-dom";
import {push} from "react-router-redux";
import {connect} from "react-redux";

class Header extends Component {

	render() {
		return (
		  <div>
			  <CategoryListContainer selectCategory={this.props.selectCategory} />
			  <Link to="/">Home</Link> |
			  <Link
				to="/new">
				  submit new post
			  </Link>
		  </div>
		);
	}
}

function mapDispatchToProps(dispatch){
	return {
	  selectCategory: (selectedCategory) => dispatch(push(`/${selectedCategory}`))
	}
}



export default withRouter(connect(null, mapDispatchToProps)(Header));