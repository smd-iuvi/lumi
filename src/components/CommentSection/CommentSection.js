import React, { useEffect, useState } from 'react';
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

function CommentSection(props) {
  const [commentsList, setCommentsList] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  function onSendComment() {
    const { firebase, videoId, userId } = props;

    const comment = {
      videoId: videoId,
      userId: userId,
      comment: newComment
    };

    firebase.comment
      .create(comment)
      .then(() => {
        setNewComment('');
        fetchComments();
      })
      .catch(error => console.log(error));
  };

  function fetchComments() {
    const { firebase, videoId } = props;
    firebase.comment
      .getCommentsBy(CommentModel.VIDEO_ID, videoId)
      .then(comments => {
        setCommentsList(comments.reverse());
      })
      .catch(error => setError(error));
  };

  function onDeleteComment(comment) {
    const { firebase, authUser } = props;

    if (comment.userId === authUser.uid) {
      firebase.comment.delete(comment.uid, error => {
        console.log(error);
      });
    }
  };

  const { videoId, userId, authUser } = props;

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
          onChange={e => setNewComment(e.target.value)}
          onSend={onSendComment}
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
                onDelete={() => onDeleteComment(comment)}
              >
                {comment.comment}
              </Comment>
            );
          })}
      </div>
    </div>
  );
}

export default compose(
  withFirebase,
  withAuthUser
)(CommentSection);
