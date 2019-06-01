import React from 'react';
import { Link } from 'react-router-dom';
import './CardFilm.css';

import * as ROUTES from '../../constants/routes';

import card from '../../assets/birdbox.jpg';

const CardFilm = ({ video }) => {
  const style = {
    backgroundImage: `url(${video.imageUrl ? video.imageUrl : card})`
  };
  return (
    <Link
      to={`${ROUTES.PLAYER}/${video.uid}`}
      style={{ textDecoration: 'none' }}
    >
      <div className="cardFilm">
        <article className="containerImgCard" style={style}>
          {/* <img
            src={video.imageUrl ? video.imageUrl : card}
            className="imgCard"
          /> */}
        </article>
        <div className="infosCard">
          <h1 className="Medium-Text-Bold">
            {video ? video.title : 'Nome indefinido'}
          </h1>
          <h1 className="Medium-Text-Regular">
            {video ? video.discipline : 'Disciplina indefinida'}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default CardFilm;
