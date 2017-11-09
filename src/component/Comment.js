import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {doVoteRequest, getSinglePost, receiveSinglePost } from "../actions/postActions";
import Post from "./Post";
import SingleComment from "./SingleComment";
import CommentForm from "./CommentForm";

class Comment extends Component {

	componentDidMount() {
		const {postId} = this.props.match.params;
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
	return {
		currentPost: state.post.currentPost,
		comments: state.comment.comments
	}
}


function mapDispatchToProps(dispatch) {
	return {
		getSinglePost: (postId) => dispatch(getSinglePost(postId)),
		onVote: (option, post) => dispatch(doVoteRequest(post.id, option, receiveSinglePost))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));