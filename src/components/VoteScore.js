import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import { voteOnPost } from '../actions/posts';

class VoteScore extends Component {

  vote(option) {
    if(this.props.type === 'post') {
      this.props.voteOnPost(this.props.id, option);
    }
  }

  render() {
    return (
      <div className='vote-score-wrap'>
        <span>{ this.props.listview ? '' : 'Vote Score: ' }</span>
        <Icon link name='thumbs outline up' onClick={() => this.vote('upVote')} />
        <Icon link name='thumbs outline down' onClick={() => this.vote('downVote')} />
        <span>{ this.props.voteScore + '  ' }</span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    postsMap: state.posts.postsMap
  }
}

export default connect(mapStateToProps, { voteOnPost })(VoteScore);