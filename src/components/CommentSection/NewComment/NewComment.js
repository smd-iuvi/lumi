import React from 'react';
import './NewComment.css';
import Person from '../../Sidebar/assets/profile.jpg';

const NewComment = () => {
    return (
        <div className="newComment">
            <div>
                <img src={Person} className="photoComment" />
                <textarea className="textComment textField" placeholder="Escreva um comentário...">
                </textarea>
            </div>
            <button className="buttonComment" disabled>Enviar</button>
        </div>
    );
}

export default NewComment;
