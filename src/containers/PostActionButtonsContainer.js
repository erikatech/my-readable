import React, {Component} from 'react';
import PostActionButtons from "../presentational/PostActionButtons";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {push} from "react-router-redux";

class PostActionButtonsContainer extends Component {

	render() {
		return <PostActionButtons
		  comment={this.props.comment}
		  edit={this.props.edit}
		  remove={this.props.remove}
		  post={this.props.post}/>
	}
}

function mapDispatchToProps(dispatch) {
	return {
		comment: (post) => dispatch(push(`/${post.category}/comment/${post.id}`)),
		edit: (post) => console.log("edit >>> ", post),
		remove: (post) => console.log("remove >>> ", post)
	}
}


export default withRouter(connect(null, mapDispatchToProps)(PostActionButtonsContainer));