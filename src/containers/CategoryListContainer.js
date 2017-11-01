import React, { Component } from 'react';
import CategoryList from "../presentational/CategoryList";
import {fetchCategories} from "../actions/categoryActions";
import {withRouter} from "react-router";
import {connect} from "react-redux";

class CategoryListContainer extends Component {

	componentDidMount(){
		this.props.requestCategories();
	}

	render(){
		const selectedCategory = this.props.location.pathname.replace("/", "");
		return (
		  <CategoryList
		    selectedCategory={selectedCategory}
		    selectCategory={this.props.selectCategory}
		    categories={ this.props.categories }
		  />
		)
	}
}

function mapStateToProps(state){
	return {
		categories: state.category.categories
	};
}

function mapDispatchToProps(dispatch){
	return {
		requestCategories: () => dispatch(fetchCategories())
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryListContainer));