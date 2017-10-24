import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Table } from 'semantic-ui-react';

import { getCategories } from '../actions/categories';
import { getAllPosts } from '../actions/posts';
import TopBar from './TopBar';
import PostListView from './PostListView';
import { toArray } from '../utils/helpers';

class Home extends Component {
  state = {
    sortBy: 'voteScore'
  }

  componentDidMount() {
    this.props.getAllPosts();
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
          <div>
            <h2>All Posts</h2>
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
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='7'>
                    <Link to='/post/add' className="ui icon primary left labeled button" role="button"><i aria-hidden="true" className="plus icon"></i>New Post</Link>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => { 
  return {
    categories: state.categories,
    posts: state.posts.postsMap
  }
}

export default connect(mapStateToProps, { getCategories, getAllPosts })(Home);
