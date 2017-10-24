import { 
        fetchAllPosts, 
        fetchSinglePost, 
        fetchPostsByCategory,
        postAddPost, 
        putEditPost,
        postVoteOnPost,
        deleteDeletePost
      } from '../utils/api';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST';
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY';
export const ADD_EDIT_POST_SUCCESS = 'ADD_EDIT_POST_SUCCESS';
export const VOTE_ON_POST_SUCCESS = 'VOTE_ON_POST_SUCCESS';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';

export const getAllPosts = () => dispatch => (
  fetchAllPosts().then(res => dispatch(receiveAllPosts(res)))
)

export const getSinglePost = postId => dispatch => (
  fetchSinglePost(postId).then(res => dispatch(receiveSinglePost(res)))
)

export const getPostsByCategory = catId => dispatch => (
  fetchPostsByCategory(catId).then(res => dispatch(receivePostsByCategory(res)))
)

export const addPost = postObj => dispatch => (
  postAddPost(postObj).then(res => dispatch(addEditPostSuccess(res)))
)

export const editPost = postObj => dispatch => (
  putEditPost(postObj).then(res => dispatch(addEditPostSuccess(res)))
)

export const voteOnPost = (postId, option) => dispatch => {
  return postVoteOnPost(postId, option).then(res => {dispatch(voteOnPostSuccess(res))})
}

export const deletePost = postId => dispatch => (
  deleteDeletePost(postId).then(res => dispatch(deletePostSuccess(res)))
)

export const receiveAllPosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const receiveSinglePost = post => ({
  type: RECEIVE_SINGLE_POST,
  currentViewingPost: post
});

export const receivePostsByCategory = posts => ({
  type: RECEIVE_POSTS_BY_CATEGORY,
  posts
});

export const addEditPostSuccess = post => ({
  type: ADD_EDIT_POST_SUCCESS,
  addedPost: post
});

export const voteOnPostSuccess = post => ({
  type: VOTE_ON_POST_SUCCESS,
  currentViewingPost: post
});

export const deletePostSuccess = post => ({
  type: DELETE_POST_SUCCESS,
  deletedPost: post
});
