import React, { Component } from 'react';
import {connect} from "react-redux";
import {removeComment, updateCommentDetails, voteComment} from "../actions/commentActions";
import Vote from "../presentational/Vote";

class SingleCommentContainer extends Component {

	constructor(props){
		super(props);
		this.state = {
			isEditing: false
		}
	}

	componentWillReceiveProps(){
		this.setState({isEditing: false});
	}

	handleCommentChange = (commentValue) => {
		this.setState({commentBody: commentValue});
	};

	toggleEditing = () => {
		if(this.state.isEditing){
			this.props.comment.timestamp = new Date().getTime();
			this.props.comment.body = this.state.commentBody;

			this.props.updateComment(this.props.comment)
		} else {
			this.setState({isEditing: !this.state.isEditing});
		}
	};

	render() {
		const { isEditing } = this.state;
		const { comment } = this.props;

		return (
		  <div>
			  <Vote voteScore={comment.voteScore}
			        onVote={(option) => this.props.voteComment(comment, option)} />

			  {isEditing && (<button onClick={() => this.setState({isEditing: false})}>cancel</button>)}


			  {isEditing && (
				<div>
					<textarea onChange={(e) => this.handleCommentChange(e.target.value)}
					          cols="30" rows="10" defaultValue={comment.body}/>
				</div>
			  )}

			  {!isEditing && (
			    <div>
				    <p>{comment.body}</p>

				    <span>{comment.author}</span>
				    <br/>
			    </div>
			  )}

			  <button onClick={() => this.toggleEditing()}>{isEditing ? 'save' : 'edit'}</button>
			  <button onClick={() => this.props.removeComment(comment)}>remove</button>

			  <hr/>
		  </div>
		)
	}
}

function mapDispatchToProps(dispatch){
	return {
		voteComment: (comment, option) => dispatch(voteComment(comment.id, option)),
		updateComment: (comment) => dispatch(updateCommentDetails(comment)),
		removeComment: (comment) => dispatch(removeComment(comment.id))
	}
}

export default connect(null, mapDispatchToProps)(SingleCommentContainer);