import React from 'react';
import './NewComment.css';
import Person from '../../Sidebar/assets/profile.jpg';
import { withAuthUser } from '../../../Firebase/Session';

const NewComment = ({ newComment, onChange, onSend, authUser }) => {
  const isSendEnabled = newComment !== '' ? true : false;
  return (
    <div className="newComment">
      <div>
        <img
          src={authUser ? authUser.photo_url : Person}
          className="photoComment"
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
