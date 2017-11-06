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

function updatePostAfterRemoval(removedPost){
	return {
		type: "UPDATE_POSTS_AFTER_REMOVAL",
		removedPost
	}
}

export function didVote(updatedPost) {
	return {
		type: 'DID_VOTE',
		updatedPost
	}
}


export function receiveSinglePost(currentPost){
	return {
		type: 'RECEIVE_SINGLE_POST',
		currentPost
	}
}

export function orderPosts(field){
	return {
		type: "ORDER_POSTS",
		field
	}
}

export function removePost(post){
	return dispatch => {
		return ReadableAPI.removePost(post)
		  .then((removedPost) => dispatch(updatePostAfterRemoval(removedPost)))
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

export function doVoteRequest(postId, option, fn) {
	return dispatch => {
		return ReadableAPI.vote(postId, option)
		  .then((updatedPost) => dispatch(fn(updatedPost)))
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
