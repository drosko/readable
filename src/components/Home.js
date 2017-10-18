import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Table } from 'semantic-ui-react';
import moment from 'moment';
import { getCategories } from '../actions/categories';
import { getAllPosts } from '../actions/posts';
import TopBar from './TopBar';

class Home extends Component {
  state = {
    sortBy: 'voteScore'
  }

  componentDidMount() {
    this.props.getCategories();
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
                  <Table.HeaderCell>VoteScore</Table.HeaderCell>
                  <Table.HeaderCell>Category</Table.HeaderCell>
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
                          <span>{post.category}</span>
                        </Table.Cell>
                        <Table.Cell>
                          <span>{moment(post.timestamp).format('MMMM Do YYYY')}</span>
                        </Table.Cell>
                      </Table.Row>
                    ))
                }              
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='4'>
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

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getCategories()),
    getAllPosts: () => dispatch(getAllPosts())
  }
}

const mapStateToProps = (state) => { 
  return {
    categories: state.categories,
    posts: state.posts.listAll
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
