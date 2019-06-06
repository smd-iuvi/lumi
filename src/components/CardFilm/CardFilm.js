import React from 'react';
import { Link } from 'react-router-dom';
import './CardFilm.css';

import * as ROUTES from '../../constants/routes';

import card from '../../assets/birdbox.jpg';

const CardFilm = ({ video }) => {
  return (
    <Link
      to={`${ROUTES.PLAYER}/${video.uid}`}
      style={{ textDecoration: 'none' }}
    >
      <div className="cardFilm">
        <article className="containerImgCard">
          <img
            src={video && video.imageUrl ? video.imageUrl : card}
            className="imgCard"
          />
        </article>
        <div className="infosCard">
          <h1 className="Medium-Text-Bold">
            {video ? video.title : 'Nome indefinido'}
          </h1>
          <h1 className="Medium-Text-Regular">
            {video && video.discipline
              ? `${video.discipline.substring(0, 20)}...`
              : 'Vídeo independente'}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default CardFilm;
