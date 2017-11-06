import React, {Component} from 'react';
import CategoryList from "../presentational/CategoryList";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as ReadableAPI from '../utils/ReadableAPI';
import {generateUUID} from "../utils/AppUtils";
import {getSinglePost} from "../actions/postActions";

class NewPostContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			post: {title: "", author: "", body: "", category: ""},
			errorMessages: {},
			fieldsToValidate: ["title", "author", "body", "category"]
		}
	}

	componentDidMount(){
		const postId = this.props.match.params.postId;
		if(postId){
			this.props.getSinglePost(postId);
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.currentPost){
			this.setState({post: nextProps.currentPost});
		}

	}

	handleInputChange = (key, value) => {
		this.setState(state => {
			state.post[key] = value;
			return state;
		})
	};

	sendPost = () => {
		if(this.isFormValid()){
			const { post } = this.state;
			post.timestamp = new Date().getTime();

			if(post.id){
				ReadableAPI.updatePost(post).then(() => {
					this.props.history.goBack();
				});

			} else {
				post.id = post.id || generateUUID();
				ReadableAPI.sendPost(post)
				  .then(() => {
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

			  <input type="button" onClick={this.sendPost} value="Submit"/>
		  </div>
		)
	}
}

function mapStateToProps(state) {
	return {
		categories: state.category.categories,
		currentPost: state.post.currentPost
	}
}

function mapDispatchToProps(dispatch){
	return {
		getSinglePost: (postId) => dispatch(getSinglePost(postId))
	}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPostContainer));