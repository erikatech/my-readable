import * as ReadableAPI from '../../utils/ReadableAPI';

/**
 * update a comment after its edition
 * @param comment the comment being updated
 * @returns {{type, comment}}
 */
function updateComment(comment) {
	return {
		type: "UPDATE_COMMENT",
		comment
	}
}

/**
 * used to vote a comment
 * @param commentId the comment being voted
 * @param option (upVoted or downVote)
 * @returns {function(*)}
 */
export function voteComment(commentId, option){
	return dispatch => {
		return ReadableAPI.voteComment(commentId, option)
		  .then((comment) => dispatch(updateComment(comment)))
	}
}

/**
 * request an updating in a comment
 * @param comment
 * @returns {function(*)}
 */
export function updateCommentDetails(comment){
	return dispatch => {
		return ReadableAPI.updateComment(comment)
		  .then((comment) => dispatch(updateComment(comment)))
	}
}

/**
 * used to update the comments inside the store
 * @param comments
 * @returns {{type: string, comments: *}}
 */
function receiveComments(comments) {
	return {
		type: "RECEIVE_COMMENTS",
		comments
	}
}

/**
 * updates the comments after removing one of them
 * @param comment the comment to be removed
 * @returns {{type: string, comment: *}}
 */
function updateAfterRemoval(comment){
	return {
		type: "UPDATE_AFTER_REMOVAL",
		comment
	}

}

/**
 * makes a request to remove a comment
 * @param commentId id of the comment being removed
 * @returns {function(*)}
 */
export function removeComment(commentId){
	return dispatch => {
		return ReadableAPI.removeComment(commentId)
		  .then((comment) => dispatch(updateAfterRemoval(comment)))
	}
}


/**
 * sends a comment
 * @param comment
 * @returns {function(*)}
 */
export function sendComment(comment) {
	return dispatch => {
		return ReadableAPI.comment(comment)
		  .then((comment) => dispatch(updateComment(comment)));
	}
}

/**
 * list the comments from a post
 * @param postId
 * @returns {function(*)}
 */
export function getComments(postId) {
	return dispatch => {
		return ReadableAPI.getComments(postId)
		  .then(comments => dispatch(receiveComments(comments)))
	}
}
