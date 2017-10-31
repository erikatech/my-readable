import React from 'react';

const PostActionButtons = ({post, comment, edit, remove}) => {

	return (
	  <div>
		  <button onClick={() => comment(post)}>Comment</button>
		  <button onClick={() => edit(post)}>Edit</button>
		  <button onClick={() => remove(post)}>Remove</button>
	  </div>
	)
};

export default PostActionButtons;