import * as ReadableAPI from "../../utils/ReadableAPI";

/**
 *
 * @returns {{type: string}}
 */
function fetchCategoriesRequest(){
	return {
		type: "FETCH_CATEGORIES_REQUEST",
		isFetching: true
	}
}


function fetchCategoriesSuccess(categories){
	return {
		type: "FETCH_CATEGORIES_SUCCESS",
		categories,
		isFetching: false
	}
}

function fetchCategoriesFailure(err){
	return {
		type: "FETCH_CATEGORIES_FAILURE",
		err,
		isFetching: false
	}
}

/**
 * fetch the categories from the server
 * @returns {function(*)}
 */
export function fetchCategories(){
	return dispatch => {
		dispatch(fetchCategoriesRequest());
		return ReadableAPI.getCategories()
		  .then(categories => dispatch(fetchCategoriesSuccess(categories)))
		  .catch(err => dispatch(fetchCategoriesFailure(err)));
	}
}
