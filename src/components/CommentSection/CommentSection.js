import React, { Component } from 'react';

import './CommentSection.css';

import NewComment from './NewComment/NewComment';

class CommentSection extends Component {
  render() {
    return (
      <>
        <article className="line" />
        <NewComment />
      </>
    );
  }
}

export default CommentSection;
