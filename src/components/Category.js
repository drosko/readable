import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Table } from 'semantic-ui-react';

import { getPostsByCategory } from '../actions/posts';
import { toArray } from '../utils/helpers';

import TopBar from './TopBar';
import PostListView from './PostListView';

class Category extends Component {

  state = {
    sortBy: 'voteScore'
  }

  componentDidMount() {
    this.props.getPostsByCategory(this.props.match.params.id);
    console.log('in component did mount');
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.id != this.props.match.params.id) {
      this.props.getPostsByCategory(nextProps.match.params.id);
    }
  }

  handleSort(evt) {
    if (evt.target.value) {
      this.setState({
        sortBy: evt.target.value
      });
    }
  }

  render() {
    return (
      <div className="App">
        <TopBar />
        <Container className='container-mod'>
          <h2>Posts in the { this.props.match.params.id } Category</h2>
          <div>
              <label htmlFor='sort_by'>Sort By: </label> 
              <select id='sort_by' placeholder="Sort By" defaultValue='voteScore' onChange={(evt) => this.handleSort(evt)}>
                <option value='timestamp'>Date</option>
                <option value='voteScore'>Votes</option>
              </select>
            </div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Post</Table.HeaderCell>
                <Table.HeaderCell>Vote Score</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
                <Table.HeaderCell>Comments</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                toArray(this.props.posts)
                  .sort((a, b) => {
                    return b[this.state.sortBy] - a[this.state.sortBy];
                  })                
                  .map((post) => (
                    <PostListView post={post} key={post.id + '_' + post.title} />
                  ))
              }
            </Table.Body>
          </Table>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.postsMap
  }
}

export default connect(mapStateToProps, { getPostsByCategory })(Category);
