import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {didVote, doVoteRequest, fetchPosts, fetchPostsByCategory, orderPosts, removePost} from "../../actions/post/postActions";
import Post from "../post/Post";

/**
 * Represents the main page
 */
class Home extends Component {
	componentDidMount() {
		// fetch the posts from API
		this.getPosts(this.props.match.params.category);
	}

	/**
	 *
	 * @param nextProps
	 */
	componentWillReceiveProps(nextProps) {
		// here we deal with the navigation through the browser
		const currentCategory = this.props.match.params.category;
		const nextCategory = nextProps.match.params.category;

		// if we are going to a different category, we need to update the posts
		if (nextCategory !== currentCategory) {
			this.getPosts(nextCategory);
		}
	}

	/**
	 * used to get the posts
	 * @param selectedCategory the desired category
	 */
	getPosts = (selectedCategory) => {
		if (selectedCategory) { // if the selectedCategory exists, we fetch by category
			this.props.requestPostsFromCategory(selectedCategory)
		} else { // if it's not, we fetch all the posts
			this.props.requestPosts();
		}
	};

	render() {
		const {posts, onRemove, onOrder, onVote} = this.props;
		return (
		  <div className="home-container">
			  <div onChange={(e) => onOrder(e.target.value)} className="order-container">
				  <input type="radio" value="voteScore" name="order" defaultChecked/> Upvoted
				  <input type="radio" value="timestamp" name="order"/> Recently
			  </div>
			  {posts.map(post => (
			    <Post key={post.id}
			          post={post}
			          onVote={onVote}
			          onRemove={onRemove}
			    />
			  ))}
		  </div>
		);
	}
}

/**
 * responsible for sorting the posts
 * @param posts the posts to sorting
 * @param field the field by which the sort will be made
 * @returns {Array.<T>}
 */
function getSortedPosts(posts, field){
	return posts.sort((a, b) => {
		if(field === 'timestamp'){ // checks if we have to sort by date or vote score
			return new Date(b[field]) - new Date(a[field]);
		}
		return b[field] - a[field];
	});
}

/**
 *
 * @param state
 * @returns {{posts: Array.<T>}}
 */
function mapStateToProps(state) {
	const posts =  Object.keys(state.post.posts).map(key => state.post.posts[key]);
	return {
		posts: getSortedPosts(posts, state.post.sortField)
	};
}

/**
 *
 * @param dispatch
 * @returns {{requestPosts: (function(): *), requestPostsFromCategory: (function(*=): *), onVote: (function(*=, *): *), onOrder: (function(*=): *), onRemove: (function(*): *)}}
 */
function mapDispatchToProps(dispatch) {
	return {
		requestPosts: () => dispatch(fetchPosts()),
		requestPostsFromCategory: (selectedCategory) => dispatch(fetchPostsByCategory(selectedCategory)),
		onVote: (option, post) => dispatch(doVoteRequest(post.id, option, didVote)),
		onOrder: (field) => dispatch(orderPosts(field)),
		onRemove: (post) => dispatch(removePost(post.id))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));