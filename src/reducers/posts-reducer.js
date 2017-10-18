import {
  RECEIVE_POSTS,
  RECEIVE_SINGLE_POST,
  RECEIVE_POSTS_BY_CATEGORY,
  ADD_EDIT_POST_SUCCESS,
  VOTE_ON_POST_SUCCESS
} from '../actions/posts';

const initialPostsState = {
  listAll: [],
  currentViewingPost: null,
  byCategory: null
}

function posts (state = initialPostsState, action) {

  const { posts } = action;

  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        listAll: posts
      }
    case RECEIVE_POSTS_BY_CATEGORY: 
      return {
        ...state,
        byCategory: posts
      }
    case RECEIVE_SINGLE_POST:
    case VOTE_ON_POST_SUCCESS:
      return {
        ...state,
        currentViewingPost: action.currentViewingPost
      }
    case ADD_EDIT_POST_SUCCESS:
      return {
        ...state,
        addedPost: action.addedPost
      }
    default :
      return state
  }
}

export default posts;