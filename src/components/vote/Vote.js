import React from 'react';

/**
 * Dumb component used to render the vote buttons for each post
 * @param voteScore the voteScore of the post
 * @param onVote it only throws the selected option outside
 * @constructor
 */
const Vote = ({voteScore, onVote}) =>
  <div className="vote-container">
	  <button className="upvote" onClick={() => onVote("upVote")}/>
	  <span>{voteScore}</span>
	  <button className="downvote" onClick={() => onVote("downVote")}/>
  </div>;
export default Vote;