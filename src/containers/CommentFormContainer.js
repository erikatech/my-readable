import React, { Component } from 'react';
import {generateUUID} from "../utils/AppUtils";
import {sendComment} from "../actions/commentActions";
import {connect} from "react-redux";
import {withRouter} from "react-router";

class CommentFormContainer extends Component {

	constructor(props){
		super(props);
		this.state = {
			comment: {
				author: "",
				body: ""
			},
			errorMessages: {}
		};
	}


	handleInputChange = (key, value) => {
		this.setState(state => {
			state.comment[key] = value;
			return state;
		})
	};

	prepareComment = () => {
		if(this.isValid()){
			const {comment} = this.state;
			comment.timestamp = new Date().getTime();
			comment.parentId = this.props.postId;
			comment.id = generateUUID();
			this.props.sendComment(comment).then(() => {
				this.setState({comment: {
					author: "",
					body: ""
				}});
			});
		}
	};

	isValid = () => {
		const {comment, errorMessages} = this.state;
		Object.keys(comment).forEach(key => {
			const previousErrorMessage = errorMessages;
			if(!comment[key].trim()){
				previousErrorMessage[key] = 'field required';
			} else {
				delete previousErrorMessage[key];
			}
			this.setState({errorMessages: previousErrorMessage});
		});

		return !Object.keys(errorMessages).length;
	};


	render(){
		const { comment, errorMessages } = this.state;
		return (
		  <div className="new-post-container">
			  <label>Author</label>
			  <input type="text" value={comment.author}
			         onChange={(e) => this.handleInputChange("author", e.target.value)}/>
			  <span className="error-message">{errorMessages["author"]}</span><br/>

			  <label>Content</label>
			  <textarea
			    value={comment.body}
			    onChange={(e) => this.handleInputChange("body", e.target.value)} cols="15" rows="10"/>
			  <span className="error-message">{errorMessages["body"]}</span><br/>

			  <input type="button" onClick={() => this.prepareComment()} value="Send"/>
		  </div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		sendComment: (comment) => dispatch(sendComment(comment)),
	}
}

export default withRouter(connect(null, mapDispatchToProps)(CommentFormContainer));