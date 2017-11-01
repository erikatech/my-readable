import React, {Component} from 'react';
import CategoryList from "../presentational/CategoryList";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as ReadableAPI from '../utils/ReadableAPI';
import {generateUUID} from "../utils/UUIDGenerator";
import {getSinglePost} from "../actions/postActions";

class NewPostContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			post: {title: "", author: "", body: "", category: ""}
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
		const { post } = this.state;
		post.timestamp = new Date().getTime();

		if(post.id){
			ReadableAPI.updatePost(post);
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
	};

	render() {
		const {post} = this.state;
		return (
		  <div>
			  <h1>{post.id ? 'Edit' : 'New'} Post</h1>
			  <label>Title</label>
			  <input type="text" value={post.title}
			         onChange={(e) => this.handleInputChange('title', e.target.value)}/><br/>

			  <label>Author</label>
			  <input type="text" value={post.author}
			         onChange={(e) => this.handleInputChange('author', e.target.value)}/><br/>


			  <label>Content</label>
			  <input type="text" value={post.body}
			         onChange={(e) => this.handleInputChange('body', e.target.value)}/><br/>

			  <CategoryList
			    selectedCategory={post.category}
				selectCategory={(category) => this.handleInputChange('category', category)}
				categories={this.props.categories}
			  /><br/>

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