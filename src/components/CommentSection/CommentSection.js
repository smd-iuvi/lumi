import React, { Component } from 'react';
import { compose } from 'recompose';

import './CommentSection.css';
import iconNotUser from './assets/user-placeholder.svg';

import NewComment from './NewComment/NewComment';
import Comment from './Comment/Comment';
import EmptyLabel from '../EmptyLabel/EmptyLabel';
import { withFirebase } from '../../Firebase';
import { QueryableFields as CommentModel } from '../../Firebase/Models/Comment';
import { withAuthUser } from '../../Firebase/Session';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class CommentSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentsList: null,
      newComment: ''
    };
  }

  componentDidMount() {
    this.fetchComments();
  }

  onNewCommentChange = e => {
    this.setState({ newComment: e.target.value });
  };

  onSendComment = () => {
    const { firebase, videoId, userId } = this.props;
    const { newComment } = this.state;

    const comment = {
      videoId: videoId,
      userId: userId,
      comment: newComment
    };

    firebase.comment
      .create(comment)
      .then(() => {
        this.setState({ newComment: '' });
        this.fetchComments();
      })
      .catch(error => console.log(error));
  };

  fetchComments = () => {
    const { firebase, videoId } = this.props;
    firebase.comment
      .getCommentsBy(CommentModel.VIDEO_ID, videoId)
      .then(comments => {
        this.setState({ commentsList: comments.reverse() });
      })
      .catch(error => this.setState({ error }));
  };

  onDeleteComment = comment => {
    const { firebase, authUser } = this.props;

    if (comment.userId === authUser.uid) {
      firebase.comment.delete(comment.uid, error => {
        console.log(error);
      });
    }
  };

  render() {
    const { videoId, userId, authUser } = this.props;
    const { commentsList, newComment } = this.state;

    const commentStyle = {
      color: '#fff',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridRowGap: '16px',
      margin: '16px'
    };

    const buttonStyle = {
      color: '#000',
      backgroundColor: '#fff'
    };

    return (
      <div className="CommentSection">
        {authUser ? (
          <NewComment
            newComment={newComment}
            onChange={this.onNewCommentChange}
            onSend={this.onSendComment}
            videoId={videoId}
            userId={userId}
          />
        ) : (
            <div className="loginForComment">
              <img src={iconNotUser} />
              <h1 className="Small-Text-Bold">Faça
                <Link to={ROUTES.SIGN_IN} className="link linkRedirect"> login </Link>
                ou
                <Link to={ROUTES.SIGN_UP} className="link linkRedirect"> registre-se </Link>
                para comentar
              </h1>
            </div>
          )}

        <h1 className="Small-Text-Bold">
          {commentsList ? commentsList.length : 'Carregando'} comentários
        </h1>

        <div className="comments">
          {commentsList &&
            commentsList.map(comment => {
              return (
                <Comment
                  comment={comment}
                  onDelete={() => this.onDeleteComment(comment)}
                >
                  {comment.comment}
                </Comment>
              );
            })}
        </div>
      </div>
    );
  }
}

export default compose(
  withFirebase,
  withAuthUser
)(CommentSection);
