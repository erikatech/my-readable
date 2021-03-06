import React, { Component } from 'react';
import {connect} from "react-redux";
import {removeComment, updateCommentDetails, voteComment} from "../../actions/comment/commentActions";
import Vote from "../vote/Vote";

/**
 * Represents a single comment
 */
class SingleComment extends Component {

	constructor(props){
		super(props);
		// we have to control if the user is editing a comment
		this.state = {
			isEditing: false
		}
	}

	componentWillReceiveProps(){
		// resets the isEditing flag
		this.setState({isEditing: false});
	}

	/**
	 * responsible for updating the commentBody state object
	 * @param commentValue
	 */
	handleCommentChange = (commentValue) => {
		this.setState({commentBody: commentValue});
	};

	toggleEditing = () => {
		// if the user is editing, this methods updates the comment
		if(this.state.isEditing){
			this.props.comment.timestamp = new Date().getTime();
			this.props.comment.body = this.state.commentBody;
			this.props.updateComment(this.props.comment)
		} else {
			// if the user is not editing, it only toggles the isEditing flag
			this.setState({isEditing: !this.state.isEditing});
		}
	};

	render() {
		const { isEditing } = this.state;
		const { comment } = this.props;

		return (
		  <div className="single-comment-container">
			  <Vote voteScore={comment.voteScore}
			        onVote={(option) => this.props.voteComment(comment, option)} />

			  <div className="single-comment-content">
				  {isEditing && (
				    <textarea onChange={(e) => this.handleCommentChange(e.target.value)}
				              cols="30" rows="10" defaultValue={comment.body}/>
				  )}

				  {!isEditing && (
				    <div className="comment-info">
					    <span>{comment.author}</span>
					    <p>{comment.body}</p>
					    <br/>
				    </div>
				  )}

				  <div className="button-container">
					  {isEditing && (<button className="blue-button"
					                         onClick={() => this.setState({isEditing: false})}>cancel</button>)}
					  <button className="blue-button"
					          onClick={() => this.toggleEditing()}>{isEditing ? 'save' : 'edit'}</button>
					  <button className="red-button" onClick={() => this.props.removeComment(comment)}>remove</button>
				  </div>
			  </div>
		  </div>
		)
	}
}

/**
 *
 * @param dispatch
 * @returns {{voteComment: (function(*, *=): *), updateComment: (function(*=): *), removeComment: (function(*): *)}}
 */
function mapDispatchToProps(dispatch){
	return {
		voteComment: (comment, option) => dispatch(voteComment(comment.id, option)),
		updateComment: (comment) => dispatch(updateCommentDetails(comment)),
		removeComment: (comment) => dispatch(removeComment(comment.id))
	}
}

export default connect(null, mapDispatchToProps)(SingleComment);