import React from "react";
import CategoryListContainer from "../../containers/CategoryListContainer";
import {Link} from "react-router-dom";

/**
 * Functional component used to render to header of the application
 * @returns {XML}
 * @constructor
 */
const Header = () => {
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
};
export default Header;