import React, {Component} from 'react';
import CategoryListContainer from "../containers/CategoryListContainer";
import {withRouter} from 'react-router';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {fetchCategories} from "../actions/categoryActions";

class Header extends Component {

	componentDidMount() {
		this.props.requestCategories();
	}

	render() {
		return (
		  <div className="header-container">
			  <CategoryListContainer />
			  <Link to="/">home</Link> |
			  <Link
				to="/new">
				  new post
			  </Link>
		  </div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		requestCategories: () => dispatch(fetchCategories())
	}
}


export default withRouter(connect(null, mapDispatchToProps)(Header));