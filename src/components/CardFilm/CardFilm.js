import React from 'react';
import './CardFilm.css';

import card from '../../assets/birdbox.jpg';

const CardFilm = ({ video }) => {
  return (
    <div className="cardFilm">
      <article className="containerImgCard">
        <img src={card} className="imgCard" />
      </article>
      <div className="infosCard">
        <h1 className="titleCard">{video ? video.title : 'Nome indefinido'}</h1>
        <h1 className="disciplineCard">
          {video ? video.discipline : 'Disciplina indefinida'}
        </h1>
      </div>
    </div>
  );
};

export default CardFilm;
