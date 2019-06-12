import React from 'react';
import './NewComment.css';
import Person from '../../Sidebar/assets/profile.jpg';

const NewComment = ({ newComment, onChange, onSend }) => {
  const isSendEnabled = newComment !== '' ? true : false;
  return (
    <div className="newComment">
      <div>
        <img src={Person} className="photoComment" />
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

export default NewComment;
