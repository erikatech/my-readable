import React from 'react';

const Vote = ({voteScore, onVote}) =>
  <div>
	  <button onClick={() => onVote("upVote")}>+</button>
	  <span>{voteScore}</span>
	  <button onClick={() => onVote("downVote")}>-</button>
  </div>;
export default Vote;