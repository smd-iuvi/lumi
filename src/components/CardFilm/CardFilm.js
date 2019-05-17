import React from 'react';
import './CardFilm.css';

import card from '../../assets/birdbox.jpg';

const CardFilm = (props) => {
    return (
        <div className="cardFilm">
            <article className="containerImgCard"><img src={card} className="imgCard" /></article>
            <div className="infosCard">
                <h1 className="titleCard">{props.name}</h1>
                <h1 className="disciplineCard">{props.discipline}</h1>
            </div>
        </div>
    );
};

export default CardFilm;
