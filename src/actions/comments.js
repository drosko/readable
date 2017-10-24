import { 
  fetchPostComments,
  putEditComment,
  postAddComment,
  deleteDeleteComment,
  postVoteOnComment
} from '../utils/api';

export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const VOTE_ON_COMMENT_SUCCESS = 'VOTE_ON_COMMENT_SUCCESS';

export const getPostComments = postId => dispatch => (
  fetchPostComments(postId).then(res => dispatch(receivePostComments(res, postId)))
)

export const editComment = commentObj => dispatch => (
  putEditComment(commentObj).then(res => dispatch(editCommentSuccess(res)))
)

export const addComment = commentObj => dispatch => (
  postAddComment(commentObj).then(res => dispatch(addCommentSuccess(res)))
)

export const deleteComment = commentId => dispatch => (
  deleteDeleteComment(commentId).then(res => dispatch(deleteCommentSuccess(res)))
)

export const voteOnComment = (commentId, option) => dispatch => (
  postVoteOnComment(commentId, option).then(res => dispatch(voteOnCommentSuccess(res)))
)

export const receivePostComments = (comments, postId) => ({
  type: RECEIVE_POST_COMMENTS,
  comments: comments,
  postId: postId
});

export const editCommentSuccess = comment => ({
  type: EDIT_COMMENT_SUCCESS,
  editedComment: comment
});

export const addCommentSuccess = comment => ({
  type: ADD_COMMENT_SUCCESS,
  addedComment: comment
});

export const deleteCommentSuccess = comment => ({
  type: DELETE_COMMENT_SUCCESS,
  deletedComment: comment
});

export const voteOnCommentSuccess = comment => ({
  type: VOTE_ON_COMMENT_SUCCESS,
  updatedComment: comment
});