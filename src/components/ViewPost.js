import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { Container, Comment, Header, Button, Divider } from 'semantic-ui-react';
import { getSinglePost } from '../actions/posts';
import { getPostComments } from '../actions/comments';
import { deleteDeletePost } from '../utils/api';

import PostComment from './PostComment';
import VoteScore from './VoteScore';
import TopBar from './TopBar';

class ViewPost extends Component {

  componentDidMount() {
    this.props.getSinglePost(this.props.match.params.id);
    this.props.getPostComments(this.props.match.params.id);
  }

  deletePost() {
    deleteDeletePost(this.props.match.params.id).then(this.props.history.replace('/'));
    return false;
  }

  render() {
    const { post } = this.props;

    if(post && !post.author) {
      this.props.history.replace('/notfound');  
    }

    return (
      <div>
        <TopBar />      
        <Container className="container-mod">
          {post && (
            <div>
              <article>
                <h2>{post.title}</h2>
                <h5>{'By ' + post.author}</h5>
                <div>{moment(post.timestamp).format('MMMM Do YYYY')}</div>
                <p>{post.body}</p>
                <VoteScore id={this.props.match.params.id} type='post' voteScore={post.voteScore} />
                <Link to={`/post/edit/${this.props.match.params.id}`} className="ui icon primary button" role="button"><i aria-hidden="true" className="edit icon"></i>Edit Post</Link>
                <Button basic onClick={() => this.deletePost()}>Delete Post</Button>
              </article>
              <Divider />
              <Comment.Group>
                <Header as='h3' dividing>Comments</Header>
                {
                  this.props.comments.sort((a, b) => {
                    return b.voteScore - a.voteScore;
                  }).map((comment) => (
                    <PostComment key={comment.id} comment={comment} />
                  ))
                }
                <Header as='h5' dividing>Add a Comment</Header>
                <PostComment mode='add' parentId={post.id} />
              </Comment.Group>              
            </div>
          )}
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.currentViewingPost,
    comments: state.comments.currentViewingComments
  }
}

export default connect(mapStateToProps, { getSinglePost, getPostComments })(ViewPost);
