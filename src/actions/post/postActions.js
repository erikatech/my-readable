import * as ReadableAPI from '../../utils/ReadableAPI';
import {getComments} from "../comment/commentActions";
import {push} from "react-router-redux";

/**
 * action that says we are getting posts from server
 * @returns {{type: string}}
 */
function requestPosts() {
	return {
		type: "REQUEST_POSTS"
	}
}

/**
 * action that says we are getting posts from server by category
 * @param category
 * @returns {{type: string}}
 */
function requestPostsByCategory(category) {
	return {
		type: 'REQUEST_POSTS_BY_CATEGORY',
		category
	}
}

/**
 * receives the posts from the server
 * @param posts
 * @returns {{type: string, posts: *}}
 */
function receivePosts(posts) {
	return {
		type: "RECEIVE_POSTS",
		posts
	}
}

/**
 * used to update the post after removing one of them
 * @param removedPost
 * @returns {{type: string, removedPost: *}}
 */
function updatePostAfterRemoval(removedPost) {
	return {
		type: "UPDATE_POSTS_AFTER_REMOVAL",
		removedPost
	}
}

/**
 * executed when a post is voted
 * @param updatedPost the post the be updated
 * @returns {{type: string, updatedPost: *}}
 */
export function didVote(updatedPost) {
	return {
		type: 'DID_VOTE',
		updatedPost
	}
}

/**
 * used to update the currentPost
 * @param currentPost the post to be updated inside the store
 * @returns {{type: string, currentPost: *}}
 */
export function receiveSinglePost(currentPost) {
	return {
		type: 'RECEIVE_SINGLE_POST',
		currentPost
	}
}

/**
 * dispatched when user select one of the order options
 * @param sortField the field being ordered
 * @returns {{type: string, field: *}}
 */
export function orderPosts(sortField) {
	return {
		type: "ORDER_POSTS",
		sortField
	}
}

/**
 * makes a request to remove a post
 * @param post
 * @returns {function(*)}
 */
export function removePost(post) {
	return dispatch => {
		return ReadableAPI.removePost(post)
		  .then((removedPost) => dispatch(updatePostAfterRemoval(removedPost)))
	}
}

/**
 * fetch posts from the api
 * @returns {function(*)}
 */
export function fetchPosts() {
	return dispatch => {
		dispatch(requestPosts());
		return ReadableAPI.getPosts()
		  .then(response => dispatch(receivePosts(response)));
	}
}

/**
 * fetch posts by category
 * @param category the selected category
 * @returns {function(*)}
 */
export function fetchPostsByCategory(category) {
	return dispatch => {
		dispatch(requestPostsByCategory(category))
		return ReadableAPI.getPostsFromCategory(category)
		  .then(response => {
			  dispatch(receivePosts(response))
		  });
	}
}

/**
 * makes a request to vote a post
 * @param postId the voted post id
 * @param option can be upVote or downVote
 * @param fn a callback that is called when the vote is succeed
 *          This callback exists because there are two moments where this action is dispatched:
 *          - {Home}, where we have to dispatch {didVote} action, to update the post inside the posts on store
 *          - {Comments}, where we have to dispatch {receiveSinglePost} action to update the currentPost
 * @returns {function(*)}
 */
export function doVoteRequest(postId, option, fn) {
	return dispatch => {
		return ReadableAPI.vote(postId, option)
		  .then((updatedPost) => {
			  dispatch(fn(updatedPost))
		  })
	}
}

/**
 * request a single post from the api, to get all the information about the post
 * @param postId
 * @returns {function(*)}
 */
export function getSinglePost(postId) {
	return dispatch => {
		return ReadableAPI.getSinglePost(postId)
		  .then(post => {
			  dispatch(receiveSinglePost(post));
			  dispatch(getComments(post.id))
		  }).catch(() => {
			    dispatch(push(`/`));
		  })
	}
}
