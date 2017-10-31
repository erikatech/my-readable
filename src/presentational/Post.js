import React from 'react';
import PostActionButtonsContainer from "../containers/PostActionButtonsContainer";
import Vote from "./Vote";

const Post = ({post, onVote}) => {
	return (

	  <div>
		  <Vote voteScore={post.voteScore} onVote={(option) => onVote(option, post)}/>

		  <h3>{post.title}</h3>
		  <p>{post.content}</p>
		  <span>/{post.category}</span>

		  <PostActionButtonsContainer post={post} />
		  <hr/>
	  </div>
	)
};
export default Post;