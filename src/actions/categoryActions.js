import * as ReadableAPI from "../utils/ReadableAPI";

function requestCategories(){
	return {
		type: "REQUEST_CATEGORIES"
	}
}

function receiveCategories(categories){
	return {
		type: "RECEIVE_CATEGORIES",
		categories
	}
}

export function fetchCategories(){
	return dispatch => {
		dispatch(requestCategories());
		return ReadableAPI.getCategories()
		  .then(categories => {
		    dispatch(receiveCategories(categories))
		  });
	}
}
