import {combineReducers} from "redux";
import {routerReducer} from 'react-router-redux';

/**
 * deals only with post actions
 * @param state
 * @param action
 * @returns {*}
 */
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
				sortField: 'voteScore', //initially we always order by voteScore
				posts: action.posts
				  .reduce((acc, curr) => {
					  acc[curr.id] = curr;
					  return acc;
				  }, {})
			};
		case "DID_VOTE":
			//when a user votes a post, we need to update it after the request is succeed
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
		case "UPDATE_POSTS_AFTER_REMOVAL":
			// we need to remove the post from the store after the request is succeed
			const postsClone = {...state.posts};
			delete postsClone[action.removedPost.id];
			return {
				...state,
				posts: postsClone
			};
		case "ORDER_POSTS":
			// we only have to update which field the user is sorting by
		    // the sorting stuff is being done inside the mapStateToProps of Home component
			const {sortField} = action;
			return {
				...state,
				sortField
			};
		default:
			return state;
	}
}

/**
 * deals with comments actions
 * @param state
 * @param action
 * @returns {*}
 */
function comment(state = {comments: [], isEditing: false}, action) {
	switch (action.type) {
		case "RECEIVE_COMMENTS":
			return {
				...state,
				comments: action.comments
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
			// we need to remove the comment from the store after the request is succeed
			const commentsClone = {...state.comments};
			delete commentsClone[action.comment.id];
			return {
				...state,
				comments: commentsClone
			};
		default:
			return state;
	}
}

/**
 * deals with category actions
 * @param state
 * @param action
 * @returns {*}
 */
function category(state = {
	categories: [],
	isFetching: false
}, action) {
	switch (action.type) {
		case "REQUEST_CATEGORIES":
			return {
				...state,
				isFetching: true

			};
		case "FETCH_CATEGORIES_SUCCESS":
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