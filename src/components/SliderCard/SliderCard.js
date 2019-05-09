import React from 'react';
import { Link } from 'react-router-dom';

import './SliderCard.css';

import birdbox from '../../assets/birdbox.jpg';
import * as ROUTES from '../../constants/routes';

const SliderCard = ({ video }) => {
  return (
    <Link to={`${ROUTES.VIDEO}/${video.uid}`}>
      <div className="SliderCard">
        <img src={birdbox} />
      </div>
    </Link>
  );
};

export default SliderCard;
