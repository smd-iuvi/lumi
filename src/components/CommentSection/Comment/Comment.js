import React from 'react';
import './Comment.css';
import Person from '../../Sidebar/assets/profile.jpg';

const Comment = ({ children }) => {
    return (
        <div className="Comment">
            <div className="infosUser">
                <img src={Person} className="imgUserComment" />
                <h1 className="Small-Text-Bold">Maria Betânia</h1>
                <h1 className="Small-Text-Regular">4 dias atrás</h1>
            </div>
            <h1 className="Small-Text-Regular contentComment">{children}</h1>
        </div>
    );
}

export default Comment;
