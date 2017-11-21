import React, {Component} from 'react';
import CategoryList from "../../presentational/CategoryList";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as ReadableAPI from '../../utils/ReadableAPI';
import generateUUID from 'uuid/v1';
import {getSinglePost} from "../../actions/post/postActions";

/**
 * Represents the new post page as well as the editing post page
 */
class NewPost extends Component {

	constructor(props) {
		super(props);
		// initializes the state objects
		this.state = {
			post: {title: "", author: "", body: "", category: ""},
			errorMessages: {},//controls the errorMessages from each post field
			// not all fields from post will be validate. Eg.: id, parentId (in cases we are editing the post)
			fieldsToValidate: ["title", "author", "body", "category"]
		}
	}

	componentDidMount(){
		// necessary when we are editing a post
		const postId = this.props.match.params.postId;
		if(postId){
			this.props.getSinglePost(postId);
		}
	}

	/**
	 *
	 * @param nextProps
	 */
	componentWillReceiveProps(nextProps){
		// if we are editing a post, we set to store the currentPost, after getting a single
		// post from API. If it exists, we set the current post inside our component state
		if(nextProps.currentPost){
			this.setState({post: nextProps.currentPost});
		}

	}

	/**
	 * handles each input change
	 * @param key the post object key
	 * @param value the input value
	 */
	handleInputChange = (key, value) => {
		// here we update the corresponding post object property, according to the key
		// and the input value
		this.setState(state => {
			state.post[key] = value;
			return state;
		})
	};

	/**
	 * responsible for sending a post to the API
	 */
	sendPost = () => {
		if(this.isFormValid()){ // sends the post only if it fills the required fields
			const { post } = this.state;
			post.timestamp = new Date().getTime();

			if(post.id){ // if the post has id, it means it's being updated
				ReadableAPI.updatePost(post).then(() => {
					this.props.history.goBack();// after the updating we can goBack to previous path
				});
			} else { //we are creating a new post
				post.id = generateUUID(); // uses the util method to generate a new id
				ReadableAPI.sendPost(post) // sends the post
				  .then(() => {
					// if it's succeed, we can update the post object, so the form fields are reset.
					  this.setState({
						  post: {
							  id: "",
							  author: "",
							  body: "",
							  title: "",
							  category: ""
						  }
					  });
				  })
			}
		}
	};

	/**
	 * Validates the form fields
	 * @returns {boolean}
	 */
	isFormValid = () => {
		const {post, fieldsToValidate} = this.state;
		fieldsToValidate.forEach((field) => {
			const previousErrorMessages = this.state.errorMessages;
			if(!post[field].trim()){
				previousErrorMessages[field] = "field required";
			} else {
				delete previousErrorMessages[field];
			}
			this.setState({errorMessages: previousErrorMessages});
		});
		return !Object.keys(this.state.errorMessages).length;
	};

	render() {
		const {post, errorMessages} = this.state;
		return (
		  <div className="new-post-container">
			  <label>Title *</label>
			  <input type="text" value={post.title}
			         onChange={(e) => this.handleInputChange('title', e.target.value)}/>
			  <span className="error-message">{errorMessages['title']}</span><br/>


			  <label>Author *</label>
			  <input type="text" value={post.author}
			         onChange={(e) => this.handleInputChange('author', e.target.value)}/>
			  <span className="error-message">{errorMessages['author']}</span><br/>


			  <label>Content *</label>
			  <textarea value={post.body} cols="48" rows="10"
			         onChange={(e) => this.handleInputChange('body', e.target.value)}/>
			  <span className="error-message">{errorMessages['body']}</span><br/>

			  <CategoryList
			    required={true}
			    selectedCategory={post.category}
				selectCategory={(category) => this.handleInputChange('category', category)}
				categories={this.props.categories}
			  />
			  <span className="error-message">{errorMessages['category']}</span><br/>

			  <input className="blue-button"
			         type="button" onClick={this.sendPost} value="Submit"/>
		  </div>
		)
	}
}

/**
 *
 * @param state
 * @returns {{categories: (*|Array), currentPost: *}}
 */
function mapStateToProps(state) {
	return {
		categories: state.category.categories,
		currentPost: state.post.currentPost
	}
}

/**
 *
 * @param dispatch
 * @returns {{getSinglePost: (function(*=): *)}}
 */
function mapDispatchToProps(dispatch){
	return {
		getSinglePost: (postId) => dispatch(getSinglePost(postId))
	}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost));