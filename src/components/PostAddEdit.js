import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, TextArea, Button, Select, Container, Header, Message } from 'semantic-ui-react'
import uniqid from 'uniqid';

import { addPost, editPost, getSinglePost } from '../actions/posts';

import TopBar from './TopBar';

class PostAddEdit extends Component {

  state = {
    postTitle: '',
    postAuthor: '',
    postBody: '',
    postCategory: '',
    postDate: null,
    postSuccess: false,
    formSubmitting: false,
  }

  editMode = false

  componentDidMount() {
    //if mode is edit, then call getPost by id to prefill in state
    if(this.props.match.params.id) {
      this.props.getSinglePost(this.props.match.params.id);  
      this.editMode = true;    
    }
  }

  componentWillReceiveProps(nextProps) {
    const { title, author, body, category } = nextProps.post;

    this.setState({
      postTitle: title,
      postAuthor: author,
      postBody: body,
      postCategory: category
    });
  }

  handleSubmit = () => {
    this.setState({
      formSubmitting: true
    });

    const { postTitle, postAuthor, postBody, postCategory } = this.state;

    const submitObj = {
      id: this.props.match.params.id || uniqid(),
      timestamp: this.props.timestamp || Date.now(),
      title: postTitle,
      author: postAuthor,
      body: postBody,
      category: postCategory
    }

    if (this.editMode) {
      this.props.addPost(JSON.stringify(submitObj)).then(() => { 
        console.log('edit success') 
        this.setState({ 
          formSubmitting: false, 
          postSuccess: true 
        });
      }); 
    } else {
      this.props.addPost(JSON.stringify(submitObj)).then(() => { 
        console.log('add success') 
        this.setState({ 
          postTitle: '',
          postAuthor: '',
          postBody: '',
          postCategory: '',
          postDate: null,
          formSubmitting: false, 
          postSuccess: true 
        });
      });  
    }

    return false

  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { postTitle, postAuthor, postBody, postCategory } = this.state;

    const catOptions = [
      { text: 'react', value: 'react' },
      { text: 'redux', value: 'redux' },
      { text: 'udacity', value: 'udacity' }
    ];

    return (
      <div>
        <TopBar />
        <Container className='container-mod'>
          {this.state.postSuccess && (
            <Message positive onDismiss={() => this.setState({ postSuccess: false })}>
              <Message.Header>Your Post Was Saved</Message.Header>
              <p>Return to the home page to see the list of posts.</p>
            </Message>
          )}
          <Header as='h2'>{ this.editMode ? 'Edit Post' : 'New Post'}</Header>
          <Form onSubmit={this.handleSubmit} loading={ this.state.formSubmitting ? true : null }>
            <Form.Field id='post-title' name='postTitle' value={postTitle} control={Input} label='Title' placeholder='Post Title' onChange={this.handleChange} required />
            <Form.Field id='post-author' name='postAuthor' value={postAuthor} control={Input} label='Author' placeholder='Post Author' onChange={this.handleChange} required />
            <Form.Field id='post-body' name='postBody' control={TextArea} value={postBody} label='Content' onChange={this.handleChange} required />
            <Form.Field id='post-category' name='postCategory' control={Select} value={postCategory} label='Category' options={catOptions} onChange={this.handleChange} required />
            <Form.Field id='post-submit' control={Button} content='Post' />
          </Form>
        </Container>
      </div>
    )

  }

}

function mapStateToProps(state) {
  return {
    post: state.posts.currentViewingPost
  }
}

export default connect(mapStateToProps, { addPost, editPost, getSinglePost })(PostAddEdit);