const BASE_URL = 'http://localhost:3001';
const urlOpts = {
  headers: { 
    Authorization: 'unicornification', 
    "Content-Type" : "application/json"     
  }
}

export function fetchCategories () {
  return fetch(`${BASE_URL}/categories`, urlOpts)
    .then((res) => res.json())
}

export function fetchAllPosts () {
  return fetch(`${BASE_URL}/posts`, urlOpts)
    .then((res) => res.json())
}

export function fetchPostsByCategory (catId) {
  return fetch(`${BASE_URL}/${catId}/posts`, urlOpts)
    .then((res) => res.json())
}

export function fetchSinglePost (postId) {
  return fetch(`${BASE_URL}/posts/${postId}`, urlOpts)
  .then((res) => res.json())
}

export function fetchPostComments (postId) {
  return fetch(`${BASE_URL}/posts/${postId}/comments`, urlOpts)
  .then((res) => res.json())
}

export function postAddPost (postObj) {
  return fetch(`${BASE_URL}/posts`, { 
    ...urlOpts, 
    method: 'POST',
    body: postObj
  }).then((res) => res.json());
}

export function putEditPost (postObj) {
  return fetch(`${BASE_URL}/posts/${postObj.id}`, { 
    ...urlOpts, 
    method: 'PUT',
    body: postObj
  }).then((res) => res.json()); 
}

export function deleteDeletePost (postId) {
  return fetch(`${BASE_URL}/posts/${postId}`, { 
    ...urlOpts, 
    method: 'DELETE'
  }).then(res => res.json()); 
}

export function postVoteOnPost (postId, option) {
  return fetch(`${BASE_URL}/posts/${postId}`, { 
    ...urlOpts, 
    method: 'POST',
    body: JSON.stringify({ option: option })
    //body: option
  }).then(res => res.json()); 
}

export function putEditComment (commentObj) {
  return fetch(`${BASE_URL}/comments/${commentObj.id}`, {
    ...urlOpts,
    method: 'PUT',
    body: JSON.stringify(commentObj)
  }).then(res => res.json());
}

export function postAddComment (commentObj) {
  return fetch(`${BASE_URL}/comments`, {
    ...urlOpts,
    method: 'POST',
    body: JSON.stringify(commentObj)
  }).then(res => res.json());
}

export function deleteDeleteComment (commentId) {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    ...urlOpts,
    method: 'DELETE'
  }).then(res => res.json());
}

export function postVoteOnComment (commentId, option) {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    ...urlOpts,
    method: 'POST',
    body: JSON.stringify({ option: option })
  }).then(res => res.json());
}
