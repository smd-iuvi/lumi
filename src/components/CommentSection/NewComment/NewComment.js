import React from 'react';
import './NewComment.css';
import Person from '../assets/user-placeholder.svg';
import { withAuthUser } from '../../../Firebase/Session';

const NewComment = ({ newComment, onChange, onSend, authUser }) => {
  const isSendEnabled = newComment !== '' ? true : false;
  const style = {
    backgroundImage: `url(${authUser.photo_url ? authUser.photo_url : Person})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };
  return (
    <div className="newComment">
      <div>
        <article
          className="photoComment"
          style={style}
        />
        <textarea
          name="newComment"
          value={newComment}
          onChange={onChange}
          className="textComment textField Small-Text-Regular"
          placeholder="Escreva um comentário..."
        />
      </div>
      <button
        className="buttonComment Small-Text-Bold"
        disabled={!isSendEnabled}
        onClick={onSend}
      >
        Enviar
      </button>
    </div>
  );
};

export default withAuthUser(NewComment);
