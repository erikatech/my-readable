import React, {Component} from 'react';
import PostActionButtons from "../presentational/PostActionButtons";
import {withRouter} from "react-router";
import {connect} from "react-redux";

class PostActionButtonsContainer extends Component {

	render() {
		return <PostActionButtons
		  remove={this.props.remove}
		  post={this.props.post}/>
	}
}

function mapDispatchToProps(dispatch) {
	return {
		// remove: (post) => dispatch(removePost(post))
	}
}


export default withRouter(connect(null, mapDispatchToProps)(PostActionButtonsContainer));