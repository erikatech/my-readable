import React from 'react';
import Vote from "../vote/Vote";
import {Link} from "react-router-dom";
import {convertToStringDate} from "../../utils/AppUtils";

/**
 * Dumb component used to show a single post
 * @param post the post to be rendered
 * @param onVote the method used to vote a single post
 * @param showBody necessary when we need to hide the post body (the Home page)
 * @param commentsCount the comments amount of each post
 * @param onRemove used to remove a post from the post list
 * @returns {XML}
 * @constructor
 */
const Post = ({post, onVote, showBody, commentsCount, onRemove}) => {
	// link to the commentPage
	const urlToComment = `/${post.category}/${post.id}`;

	// link to edit a post
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
				    <button className="red-button" onClick={() => onRemove(post)}>Remove</button>
				  )}
			  </div>
		  </div>
	  </div>
	)
};
export default Post;