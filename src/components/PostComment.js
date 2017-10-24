import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Comment, Icon, Button, Divider } from 'semantic-ui-react';
import moment from 'moment';
import uniqid from 'uniqid';
import { editComment, addComment, deleteComment, voteOnComment } from '../actions/comments';

class PostComment extends Component {

  state = {
    mode: this.props.mode || 'view',
    commentBody: this.props.comment ? this.props.comment.body : '',
    commentAuthor: this.props.comment ? this.props.comment.author : '',
    commentTimestamp: this.props.comment ? this.props.comment.timestamp : ''
  }

  commentId = this.props.comment ? this.props.comment.id : uniqid();

  updateCommentBody(evt) {
    this.setState({
      commentBody: evt.target.value
    });
  }

  updateCommentAuthor(evt) {
    this.setState({
      commentAuthor: evt.target.value
    })
  }

  editMode() {
    this.setState({
      mode: 'edit'
    });
  }

  addMode() {
    this.setState({
      mode: 'add'
    });
  }

  saveComment() {
    if (this.state.mode === 'edit') {

      const commentObj = {
        id: this.commentId,
        timestamp: Date.now(),
        body: this.state.commentBody
      }

      this.props.editComment(commentObj).then(() => {
        this.setState({mode: 'view'})
      });
    }

    if (this.state.mode === 'add') {
      const newComment = {
        id: uniqid(),
        timestamp: Date.now(),
        body: this.state.commentBody,
        author: this.state.commentAuthor,
        parentId: this.props.parentId      
      }
  
      this.props.addComment(newComment).then(() => {
        this.setState({
          commentBody: '',
          commentAuthor: ''
        });
      });
    }
  }

  renderCommentText(body) {
    if (this.state.mode !== 'view') {
      return (<div className='field'><textarea value={body} placeholder='Enter comment' onChange={(evt) => this.updateCommentBody(evt)}></textarea></div>);
    }

    return <Comment.Text>{body}</Comment.Text>;
    
  }

  render(){

    if (this.props.mode === 'add') {
      return (
        <div className='ui form'>
            <div className='field'><input value={this.state.commentAuthor} onChange={(evt) => this.updateCommentAuthor(evt)} placeholder='Username' /></div>
            {this.renderCommentText(this.state.commentBody)}
            <Comment.Actions>
              <Button color='green' onClick={() => this.saveComment()} className='ui green button'>Add</Button>
            </Comment.Actions>
        </div>
      )
    }

    return (
      <Comment>
        <Comment.Content>
          <Comment.Author as='a'>{this.state.commentAuthor}</Comment.Author>
          <Comment.Metadata>
            <div>{moment(this.state.commentTimestamp).format('MMMM Do YYYY')}</div>
          </Comment.Metadata>
          {this.renderCommentText(this.state.commentBody)}
          <Comment.Text>
            <span>{'Vote Score: ' + this.props.comment.voteScore + '  ' }</span>
            <Icon link name='thumbs outline up' onClick={() => this.props.voteOnComment(this.props.comment.id, 'upVote')} />
            <Icon link name='thumbs outline down' onClick={() => this.props.voteOnComment(this.props.comment.id, 'downVote')} />
          </Comment.Text>
          <Comment.Actions>
            { this.state.mode === 'view' && (
              <Comment.Action onClick={() => this.editMode()}>Edit</Comment.Action>
            )}
            { this.state.mode !== 'view' && (
              <Comment.Action onClick={() => this.saveComment()}>Save</Comment.Action>
            )}
            {this.state.mode === 'view' && (<Comment.Action onClick={() => this.props.deleteComment(this.props.comment.id)}>Delete</Comment.Action>)}
          </Comment.Actions>
        </Comment.Content>
        <Divider />
      </Comment>
    )
  }
}

export default connect(null, { editComment, addComment, deleteComment, voteOnComment })(PostComment);