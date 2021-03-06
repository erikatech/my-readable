import React, { Component } from 'react';
import generateUUID from 'uuid/v1';
import {sendComment} from "../../actions/comment/commentActions";
import {connect} from "react-redux";
import {withRouter} from "react-router";

/**
 * Represents the comment form
 */
class CommentForm extends Component {

	constructor(props){
		super(props);
		// initializes the comment and errorMessages objects
		this.state = {
			comment: {
				author: "",
				body: ""
			},
			errorMessages: {}
		};
	}

	/**
	 *  Responsible for handle with all the inputs changes
	 * @param key the property under validation
	 * @param value the input value to be updated in the state comment object
	 */
	handleInputChange = (key, value) => {
		this.setState(state => {
			state.comment[key] = value;
			return state;
		})
	};

	/**
	 * Prepares the comment to be sent to the API
	 * We need to setup :
	 * - the current date in timestamp format
	 * - the parentId which corresponds to the current post id
	 * - the comment id, generated by our utility function
	 */
	prepareComment = () => {
		if(this.isValid()){
			const {comment} = this.state;
			comment.timestamp = new Date().getTime();
			comment.parentId = this.props.postId;
			comment.id = generateUUID();
			this.props.sendComment(comment).then(() => {
				// if the request is succeed we update the comment object, so
				// the form fields are reset.
				this.setState({comment: {
					author: "",
					body: ""
				}});
			});
		}
	};

	/**
	 * responsible for validate the form required fields
	 * @returns {boolean} true if form is valid
	 */
	isValid = () => {
		const {comment, errorMessages} = this.state;

		// we iterate through the comment object keys, so
		// each property can be validated
		Object.keys(comment).forEach(key => {
			const nextErrorMessage = errorMessages;

			if(!comment[key].trim()){// if the field is empty, we add a new property with the field required message
				nextErrorMessage[key] = 'field required';
			} else { //if the field is filled, we delete the property from our errorMessages copy object
				delete nextErrorMessage[key];
			}
			this.setState({errorMessages: nextErrorMessage});
		});
		// is valid only if there are no errorMessages keys
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

			  <input className="blue-button"
			         type="button" onClick={() => this.prepareComment()} value="Send"/>
		  </div>
		)
	}
}

/**
 * map methods to props
 * @param dispatch
 * @returns {{sendComment: (function(*=): *)}}
 */
function mapDispatchToProps(dispatch) {
	return {
		sendComment: (comment) => dispatch(sendComment(comment)),
	}
}

export default withRouter(connect(null, mapDispatchToProps)(CommentForm));