import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CardFilm.css';

import * as ROUTES from '../../constants/routes';

import card from '../../assets/birdbox.jpg';
import iconDelete from './assets/delete.svg';
import iconEdit from './assets/edit.svg';

function CardFilm(props) {
  const [showOptions, setShowOptions] = useState(false);

  function handleOptions() {
    setShowOptions(!showOptions);
  };

  const { video, type } = props;

  var imageStyle = {
    backgroundImage: `url(${video && video.imageUrl ? video.imageUrl : card})`
  };

  return (
    <>
      <div className="cardFilm">
        <Link
          to={`${ROUTES.PLAYER}/${video.uid}`}
          style={{ textDecoration: 'none' }}
        >
          <article className="containerImgCard" style={imageStyle}></article>
        </Link>

        <div className="infosCard">
          <Link
            to={`${ROUTES.PLAYER}/${video.uid}`}
            style={{ textDecoration: 'none' }}
          >
            <div>
              <h1 className="Medium-Text-Bold">
                {video ? `${video.title.substring(0, window.innerWidth < 800 ? 20 : 40)}...` : 'Nome indefinido'}
              </h1>
              <h1 className="Medium-Text-Regular">
                {video && video.discipline
                  ? `${video.discipline.substring(0, window.innerWidth < 800 ? 10 : 20)}...`
                  : 'Vídeo independente'}
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CardFilm;
