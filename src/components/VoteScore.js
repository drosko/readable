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
        <span>{'Vote Score: ' + this.props.voteScore + '  ' }</span>
        <Icon link name='thumbs outline up' onClick={() => this.vote('upVote')} />
        <Icon link name='thumbs outline down' onClick={() => this.vote('downVote')} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteOnPost: (postId, option) => dispatch(voteOnPost(postId, option))
  }
}

export default connect(null, mapDispatchToProps)(VoteScore);