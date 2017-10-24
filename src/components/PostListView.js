import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import moment from 'moment';

import { getPostComments } from '../actions/comments';
import { deletePost } from '../actions/posts';

import VoteScore from './VoteScore';


class PostListView extends Component {

  componentDidMount() {
    this.props.getPostComments(this.props.post.id);
  }
  
  render() {
    const { post } = this.props;

    return(
      <Table.Row>
        <Table.Cell>
          <Link to={'/post/view/' + post.id}>{post.title}</Link>
        </Table.Cell>
        <Table.Cell>
          <VoteScore type="post" id={post.id} listview={true} voteScore={post.voteScore} />
        </Table.Cell>
        <Table.Cell>
          <span>{post.author}</span>
        </Table.Cell>
        <Table.Cell>
          <span>{this.props.commentMapCount[post.id]}</span>
        </Table.Cell>
        <Table.Cell>
          <span>{post.category}</span>
        </Table.Cell>
        <Table.Cell>
          <span>{moment(post.timestamp).format('MMMM Do YYYY')}</span>
        </Table.Cell>
        <Table.Cell>
          <Link to={'/post/edit/' + post.id}>Edit</Link> | <a href="#" onClick={() => this.props.deletePost(post.id)}>Delete</a>
        </Table.Cell>
      </Table.Row>
    )
  }

}

function mapStateToProps(state) {
  return {
    commentMapCount: state.comments.commentMapCount
  }
}

export default connect(mapStateToProps, { getPostComments, deletePost })(PostListView);