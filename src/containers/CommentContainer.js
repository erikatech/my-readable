import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {getSinglePost} from "../actions/postActions";
import {sendComment} from "../actions/commentActions";
import {generateUUID} from "../utils/UUIDGenerator";
import SingleCommentContainer from "./SingleCommentContainer";

class CommentContainer extends Component {

	componentDidMount() {
		const {postId} = this.props.match.params;
		this.setState({comment: {}});
		this.props.getSinglePost(postId);
	}

	prepareComment = () => {
		const {comment} = this.state;
		comment.timestamp = new Date().getTime();
		comment.parentId = this.props.currentPost.id;
		comment.id = generateUUID();
		this.props.sendComment(comment);
	};

	componentWillReceiveProps() {
		this.setState({comment: {}});
	}

	handleAuthorChange = (value) => {
		const {comment} = this.state;
		comment.author = value;
		this.setState({comment});
	};

	handleBodyChange = (value) => {
		const {comment} = this.state;
		comment.body = value;
		this.setState({comment});
	};


	render() {
		const {currentPost, comments} = this.props;
		return (
		  <div>
			  {currentPost && (
				<div>
					<h2>{currentPost.title}</h2>
					<p>{currentPost.body}</p>
					<span>{Object.keys(comments).length} comments </span>

					<br/>

					<input type="text" onChange={(e) => this.handleAuthorChange(e.target.value)}/><br/>

					<textarea onChange={(e) => this.handleBodyChange(e.target.value)} cols="30" rows="10"/><br/>

					<input type="button" onClick={() => this.prepareComment()} value="Submit"/>

					<br/>

					<ul>
						{Object.keys(comments).map((key, index) => (
						  <SingleCommentContainer key={comments[key].id} comment={comments[key]}/>
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
		sendComment: (comment) => dispatch(sendComment(comment))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentContainer));