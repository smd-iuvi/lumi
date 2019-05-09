import React, { Component } from 'react';

import './CommentSection.css';

import NewComment from './NewComment/NewComment';

class CommentSection extends Component {
  render() {
    return (
      <div className="CommentSection">
        <article className="line" />
        <NewComment />
      </div>
    );
  }
}

export default CommentSection;
