import React from 'react';

const Vote = ({voteScore, onVote}) =>
  <div className="vote-container">
	  <button className="upvote" onClick={() => onVote("upVote")}/>
	  <span>{voteScore}</span>
	  <button className="downvote" onClick={() => onVote("downVote")}/>
  </div>;
export default Vote;