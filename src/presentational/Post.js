import React from 'react';
import Vote from "./Vote";
import {Link} from "react-router-dom";
import {convertToStringDate} from "../utils/AppUtils";

const Post = ({post, onVote, showBody, commentsCount, onRemove}) => {
	const urlToComment = `/${post.category}/comment/${post.id}`;
	const urlToEdit = `/new/${post.id}`;

	return (
	  <div className="post-container">
		  <Vote voteScore={post.voteScore} onVote={(option) => onVote(option, post)}/>

		  <div className="post-content">
			  <h3>{post.title}</h3>

			  {showBody && (
			    <p>{post.body}</p>
			  )}

			  <span>submitted by <strong>{post.author}</strong> to <strong>/{post.category}</strong> on {convertToStringDate(post.timestamp)}
			  </span>

			  <div>
				  <Link to={urlToComment}>{commentsCount !== undefined ? commentsCount : post.commentCount} comments </Link>
				  <Link to={urlToEdit}>Edit</Link>

				  {onRemove && (
				    <button onClick={() => onRemove(post)}>Remove</button>
				  )}
			  </div>
		  </div>
	  </div>
	)
};
export default Post;