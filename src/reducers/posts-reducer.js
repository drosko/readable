import {
  RECEIVE_POSTS,
  RECEIVE_SINGLE_POST,
  RECEIVE_POSTS_BY_CATEGORY,
  ADD_EDIT_POST_SUCCESS,
  VOTE_ON_POST_SUCCESS,
  DELETE_POST_SUCCESS
} from '../actions/posts';

const initialPostsState = {
  currentViewingPost: null,
  postsMap: {}
}

function posts (state = initialPostsState, action) {

  const { posts } = action;

  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        postsMap: posts.reduce((accumulator, post) => {
          accumulator[post.id] = post;
          return accumulator;
        }, {})
      }
    case RECEIVE_POSTS_BY_CATEGORY: 
      return {
        ...state,
        postsMap: posts.reduce((accumulator, post) => {
          accumulator[post.id] = post;
          return accumulator;
        }, {})
      }
    case RECEIVE_SINGLE_POST:
    case VOTE_ON_POST_SUCCESS:
      return {
        ...state,
        currentViewingPost: action.currentViewingPost,
        postsMap: {
          ...state.postsMap,
          [action.currentViewingPost.id]: action.currentViewingPost
        }
      }
    case ADD_EDIT_POST_SUCCESS:
      return {
        ...state,
        postsMap: {
          ...state.postsMap,
          [action.addedPost.id]: action.addedPost
        }
      }
    case DELETE_POST_SUCCESS:
      let { [action.deletedPost.id]: deletedPost, ...rest } = state.postsMap;

      return {
        ...state,
        postsMap: rest
      }
    default :
      return state
  }
}

export default posts;