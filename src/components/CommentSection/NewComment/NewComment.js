import React from 'react';
import './NewComment.css';
import Person from '../../Sidebar/assets/profile.jpg';

const NewComment = () => {
    return (
        <div className="newComment">
            <div>
                <img src={Person} className="photoComment" />
                <textarea className="textComment textField Small-Text-Regular" placeholder="Escreva um comentário...">
                </textarea>
            </div>
            <button className="buttonComment Small-Text-Bold" disabled>Enviar</button>
        </div>
    );
}

export default NewComment;
