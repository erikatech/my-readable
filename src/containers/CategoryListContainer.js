/**
 * Container used to fetch the categories and map it to CategoryList props, as
 * well as the selectedCategory, which we get from the state.routing location params
 */
import CategoryList from "../presentational/CategoryList";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {push} from "react-router-redux";

const mapStateToProps = (state) => {
	return {
		categories: state.category.categories,
		selectedCategory: state.routing.location.pathname.replace("/", "")
	};
};

function mapDispatchToProps(dispatch){
	return {
		selectCategory: (selectedCategory) => dispatch(push(`/${selectedCategory}`)),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryList));