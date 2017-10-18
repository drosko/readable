import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Table } from 'semantic-ui-react';
import moment from 'moment';

import { getPostsByCategory } from '../actions/posts';

import TopBar from './TopBar';

class Category extends Component {

  state = {
    sortBy: 'voteScore'
  }

  componentDidMount() {
    this.props.getPostsByCategory(this.props.match.params.id);
  }

  componentDidUpdate() {
    this.props.getPostsByCategory(this.props.match.params.id);
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
                <Table.HeaderCell>VoteScore</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                this.props.posts
                  .sort((a, b) => {
                    return b[this.state.sortBy] - a[this.state.sortBy];
                  })                
                  .map((post) => (
                    <Table.Row key={post.id}>
                      <Table.Cell>
                        <Link to={'/post/view/' + post.id}>{post.title}</Link>
                      </Table.Cell>
                      <Table.Cell>
                        <span>{post.voteScore}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <span>{moment(post.timestamp).format('MMMM Do YYYY')}</span>
                      </Table.Cell>
                    </Table.Row>
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
    posts: state.posts.byCategory
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostsByCategory: (catId) => dispatch(getPostsByCategory(catId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
