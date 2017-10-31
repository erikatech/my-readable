import React, { Component } from 'react';
import CategoryListContainer from "./CategoryListContainer";
import {withRouter} from 'react-router';
import {Link} from "react-router-dom";

class Header extends Component {

	render() {
		return (
		  <div>
			  <CategoryListContainer />
			  <Link
				to="/new">
				  submit new post
			  </Link>
		  </div>
		);
	}
}
export default withRouter(Header);