import {
  RECEIVE_POST_COMMENTS,
  EDIT_COMMENT_SUCCESS,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  VOTE_ON_COMMENT_SUCCESS
} from '../actions/comments';


const initialCommentsState = {
  currentViewingComments: [],
  commentMapCount: {}
}

function comments (state = initialCommentsState, action) {

  const { comments } = action;
  let currentViewingComments = state.currentViewingComments;

  switch (action.type) {
    case RECEIVE_POST_COMMENTS:

      return {
        ...state,
        currentViewingComments: comments,
        commentMapCount: {
          ...state.commentMapCount,
          [action.postId]: comments.length
        }       
      }
      
    case EDIT_COMMENT_SUCCESS:
      currentViewingComments = currentViewingComments.reduce((acc, currentComment) => {
        if (currentComment.id === action.editedComment.id) {
          acc.push(action.editedComment);
        } else {
          acc.push(currentComment);
        }
        return acc;
      }, [])

      return {
        ...state,
        currentViewingComments  
      }

    case ADD_COMMENT_SUCCESS:
      
      return {
        ...state,
        currentViewingComments: [...state.currentViewingComments, action.addedComment]  
      }

    case DELETE_COMMENT_SUCCESS:

      return {
        ...state,
        currentViewingComments: state.currentViewingComments.filter(comment => comment.id !== action.deletedComment.id)
      }

    case VOTE_ON_COMMENT_SUCCESS:
      currentViewingComments = currentViewingComments.reduce((acc, currentComment) => {
        if (currentComment.id === action.updatedComment.id) {
          acc.push(action.updatedComment);
        } else {
          acc.push(currentComment);
        }
        return acc;
      }, [])

      return {
        ...state,
        currentViewingComments  
      }
      
    default :
      return state
  }
}

export default comments;