import React from 'react';
import {Link} from "react-router-dom";

const PostActionButtons = ({post, remove}) => {

	const urlToComment = `/${post.category}/comment/${post.id}`;
	const urlToEdit = `/new/${post.id}`;

	return (

	  <div>
		  <Link to={urlToComment}>{post.commentCount} comments </Link>
		  <Link to={urlToEdit}>Edit</Link>
		  <button onClick={() => remove(post)}>Remove</button>
	  </div>
	)
};

export default PostActionButtons;