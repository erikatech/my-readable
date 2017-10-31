import * as ReadableAPI from '../utils/ReadableAPI';

function updateComment(comment) {
	return {
		type: "UPDATE_COMMENT",
		comment
	}
}

export function voteComment(commentId, option){
	return dispatch => {
		return ReadableAPI.voteComment(commentId, option)
		  .then((comment) => dispatch(updateComment(comment)))
	}
}

export function updateCommentDetails(comment){
	return dispatch => {
		return ReadableAPI.updateComment(comment)
		  .then((comment) => dispatch(updateComment(comment)))
	}
}

function receiveComments(comments) {
	return {
		type: "RECEIVE_COMMENTS",
		comments
	}
}

function updateAfterRemoval(commentId){
	return {
		type: "UPDATE_AFTER_REMOVAL",
		commentId
	}

}

export function removeComment(commentId){
	return dispatch => {
		return ReadableAPI.removeComment(commentId)
		  .then((comment) => dispatch(updateAfterRemoval(comment.id)))
	}
}

export function sendComment(comment) {
	return dispatch => {
		return ReadableAPI.comment(comment)
		  .then((comment) => dispatch(updateComment(comment)));
	}
}

export function getComments(postId) {
	return dispatch => {
		return ReadableAPI.getComments(postId)
		  .then(comments => dispatch(receiveComments(comments)))
	}
}
