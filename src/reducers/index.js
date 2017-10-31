import {combineReducers} from "redux";
import {routerReducer} from 'react-router-redux';

function post(state = {isFetching: false, posts: []}, action) {
	switch (action.type) {
		case "REQUEST_POSTS":
			return {
				...state,
				isFetching: true
			};
		case "REQUEST_POSTS_BY_CATEGORY":
			return {
				...state,
				isFetching: true
			};

		case "RECEIVE_POSTS":
			return {
				...state,
				isFetching: false,
				posts: action.posts.reduce((acc, curr) => {
					acc[curr.id] = curr;
					return acc;
				}, {})
			};
		case "DID_VOTE":
			const {updatedPost} = action;
			return {
				...state,
				posts: {
					...state.posts,
					[action.updatedPost.id]: updatedPost
				}
			};
		case "RECEIVE_SINGLE_POST":
			return {
				...state,
				currentPost: action.currentPost
			};
		default:
			return state;
	}
}

function comment(state = {comments: [], isEditing: false}, action) {
	switch (action.type) {
		case "RECEIVE_COMMENTS":
			return {
				...state,
				comments: action.comments
				  .filter(comment => !comment.deleted)
				  .reduce((acc, curr) => {
					  acc[curr.id] = curr;
					  return acc;
				  }, {})
			};
		case "UPDATE_COMMENT":
			return {
				...state,
				comments: {
					...state.comments,
					[action.comment.id]: action.comment

				}
			};
		case "UPDATE_AFTER_REMOVAL":
			return {
				...state,
				comments: Object.keys(state.comments)
				  .filter((key) => key !== action.commentId)
				  .reduce((acc, curr) => {
					  acc[curr] = state.comments[curr];
					  return acc;
				  }, {})
			};
		default:
			return state;
	}
}

function category(state = {
	categories: [],
	isFetching: false
}, action) {
	switch (action.type) {
		case "SELECT_CATEGORY":
			const {selectedCategory} = action;
			return {
				...state,
				selectedCategory
			};
		case "REQUEST_CATEGORIES":
			return {
				...state,
				isFetching: true

			};
		case "RECEIVE_CATEGORIES":
			return {
				...state,
				isFetching: false,
				categories: action.categories
			};
		default:
			return state;
	}
}

export default combineReducers({
	post: post,
	category: category,
	comment: comment,
	routing: routerReducer
});