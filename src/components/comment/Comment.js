import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {doVoteRequest, getSinglePost, receiveSinglePost } from "../actions/postActions";
import Post from "./Post";
import SingleComment from "./SingleComment";
import CommentForm from "./CommentForm";

/**
 * Component that represents the CommentsPage
 */
class Comment extends Component {

	componentDidMount() {
		// we get the postId from the params
		const {postId} = this.props.match.params;
		// fetch the post from the API, passing the postId from URL
		this.props.getSinglePost(postId);
	}

	render() {
		const {currentPost, comments} = this.props;
		return (
		  <div>
			  {currentPost && (
				<div>
					<Post showBody={true}
					      post={currentPost}
					      commentsCount={Object.keys(comments).length}
					      onVote={(option) => this.props.onVote(option, currentPost)} />
					<br/>

					<CommentForm postId={currentPost.id} />

					<br/>

					<ul>
						{Object.keys(comments).map((key, index) => (
						  <SingleComment key={comments[key].id} comment={comments[key]}/>
						))}
					</ul>
				</div>
			  )}

		  </div>
		)
	}
}

function mapStateToProps(state) {
	// here we transform to a list so the comments can be sorted
	const comments =  Object.keys(state.comment.comments).map(
	  key => state.comment.comments[key]
	);
	return {
		currentPost: state.post.currentPost,
		// sorts the comments by the voteScore
		comments: comments.slice().sort((a, b) => b['voteScore'] - a['voteScore'])
	}
}

/**
 * mapping the required methods to props
 * @param dispatch
 * @returns {{getSinglePost: (function(*=): *), onVote: (function(*=, *): *)}}
 */
function mapDispatchToProps(dispatch) {
	return {
		getSinglePost: (postId) => dispatch(getSinglePost(postId)),
		onVote: (option, post) => dispatch(doVoteRequest(post.id, option, receiveSinglePost))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));