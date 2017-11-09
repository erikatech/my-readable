import * as ReadableAPI from "../utils/ReadableAPI";

/**
 *
 * @returns {{type: string}}
 */
function requestCategories(){
	return {
		type: "REQUEST_CATEGORIES"
	}
}

/**
 * receive the category list from request
 * @param categories
 * @returns {{type: string, categories: *}}
 */
function receiveCategories(categories){
	return {
		type: "RECEIVE_CATEGORIES",
		categories
	}
}

/**
 * fetch the categories from the server
 * @returns {function(*)}
 */
export function fetchCategories(){
	return dispatch => {
		dispatch(requestCategories());
		return ReadableAPI.getCategories()
		  .then(categories => {
		    dispatch(receiveCategories(categories))
		  });
	}
}
