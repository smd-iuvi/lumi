import React from 'react';
import './NewComment.css';
import Person from '../../Sidebar/assets/profile.jpg';

const NewComment = () => {
    return (
        <div className="newComment">
            <img src={Person} className="photoComment" />
            <textarea className="textComment textField" placeholder="Escreva um comentário...">
            </textarea>
            <div className="buttonsSubmit">
                <button className="button buttonSecundary">CANCELAR</button>
                <button className="button buttonPrimary">COMENTAR</button>
            </div>
        </div>
    );
}

export default NewComment;
