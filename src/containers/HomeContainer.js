import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {didVote, doVoteRequest, fetchPosts, fetchPostsByCategory, orderPosts} from "../actions/postActions";
import Post from "../presentational/Post";

class HomeContainer extends Component {

	componentDidMount() {
		this.getPosts(this.props.match.params.category);
	}

	componentWillReceiveProps(nextProps){
		const currentCategory = this.props.match.params.category;
		const nextCategory = nextProps.match.params.category;
		if(nextCategory !== currentCategory){
			this.getPosts(nextCategory);
		}
	}

	getPosts = (selectedCategory) => {
		if (selectedCategory) {
			this.props.requestPostsFromCategory(selectedCategory)
		} else {
			this.props.requestPosts();
		}
	};

	render() {
		const {posts} = this.props;
		return (
		  <div>
			  My Posts

			  <div onChange={(e) => this.props.onOrder(e.target.value)}>
				  <input type="radio" value="voteScore" name="order" defaultChecked/> Upvoted
				  <input type="radio" value="timestamp" name="order"/> Recently
			  </div>

			  <ul>
				  {Object.keys(posts).map((key, index) => (
				    <Post key={posts[key].id} post={posts[key]} onVote={this.props.onVote}/>
				  ))}
			  </ul>
		  </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		posts: state.post.posts
	}
}

function mapDispatchToProps(dispatch) {
	return {
		requestPosts: () => dispatch(fetchPosts()),
		requestPostsFromCategory: (selectedCategory) => dispatch(fetchPostsByCategory(selectedCategory)),
		onVote: (option, post) => dispatch(doVoteRequest(post.id, option, didVote)),
		onOrder: (field) => dispatch(orderPosts(field))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));