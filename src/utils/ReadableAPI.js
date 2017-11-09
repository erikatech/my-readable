const api = "http://localhost:3001";

let token = localStorage.token;
if (!token)
	token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
	'Accept': 'application/json',
	'Authorization': token
};

export const getCategories = () =>
  fetch(`${api}/categories`, {headers})
	.then(res => res.json())
	.then(data => data.categories);

export const getPostsFromCategory = (category) =>
  fetch(`${api}/${category}/posts`, {headers})
	.then(res => res.json())
	.then(data => data);

export const getPosts = () =>
  fetch(`${api}/posts`, {headers})
	.then(res => res.json())
	.then(data => data);

export const vote = (id, option) =>
  fetch(`${api}/posts/${id}`, {
	  method: 'POST',
	  headers: {
		  ...headers,
		  'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({option})
  }).then(res => res.json());

export const getSinglePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {headers})
	.then(res => {
		if(!res.ok){
			throw Error("Couldn't get the post");
		}
		return res.json();
	})
	.then(data => data);


export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, {headers})
	.then(res => res.json())
	.then(data => data);


export const comment = (comment) =>
	fetch(`${api}/comments`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(comment)
	}).then(res => res.json());


export const voteComment = (commentId, option) =>
  fetch(`${api}/comments/${commentId}`, {
	  method: 'POST',
	  headers: {
		  ...headers,
		  'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({option})
  }).then(res => res.json())

export const updateComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
	  method: 'PUT',
	  headers: {
		  ...headers,
		  'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(comment)
  }).then(res => res.json())

export const removeComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
	  method: 'DELETE',
	  headers: {
		  ...headers,
		  'Content-Type': 'application/json'
	  }
  }).then(res => res.json())

export const sendPost = (post) =>
	fetch(`${api}/posts`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(post)
	}).then(res => res.json())


export const updatePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
	  method: 'PUT',
	  headers: {
		  ...headers,
		  'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(post)
  }).then(res => res.json())


export const removePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
	  method: 'DELETE',
	  headers: {
		  ...headers,
		  'Content-Type': 'application/json'
	  }
  }).then(res => res.json())



