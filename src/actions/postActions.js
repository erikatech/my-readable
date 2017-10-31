import * as ReadableAPI from '../utils/ReadableAPI';
import { getComments } from "./commentActions";

function requestPosts() {
	return {
		type: "REQUEST_POSTS"
	}
}

function requestPostsByCategory(category) {
	return {
		type: 'REQUEST_POSTS_BY_CATEGORY',
		category
	}
}

function receivePosts(posts) {
	return {
		type: "RECEIVE_POSTS",
		posts
	}
}

function didVote(updatedPost) {
	return {
		type: 'DID_VOTE',
		updatedPost
	}
}

function receiveSinglePost(currentPost){
	return {
		type: 'RECEIVE_SINGLE_POST',
		currentPost
	}
}


export function fetchPosts() {
	return dispatch => {
		dispatch(requestPosts());
		return ReadableAPI.getPosts()
		  .then(response => dispatch(receivePosts(response)));
	}
}

export function fetchPostsByCategory(category) {
	return dispatch => {
		dispatch(requestPostsByCategory(category))
		return ReadableAPI.getPostsFromCategory(category)
		  .then(response => {
			  dispatch(receivePosts(response))
		  });
	}
}

export function doVoteRequest(postId, option) {
	return dispatch => {
		return ReadableAPI.vote(postId, option)
		  .then((updatedPost) => dispatch(didVote(updatedPost)));
	}
}

export function getSinglePost(postId){
	return dispatch => {
		return ReadableAPI.getSinglePost(postId)
		  .then(post => {
		  	    dispatch(receiveSinglePost(post));
			    dispatch(getComments(post.id))
		  })
	}
}
