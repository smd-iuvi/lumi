import React from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import './Carousel.css';
import 'react-responsive-carousel/lib/styles/carousel.css';
import { Carousel } from 'react-responsive-carousel';

import SliderCard from '../SliderCard/SliderCard';
import EmptyLabel from '../EmptyLabel/EmptyLabel';

const Carousels = ({ videos, loading }) => {
  let children = null;

  if (loading) {
    children = <EmptyLabel>Carregando...</EmptyLabel>;
  } else if (videos != null) {
    children = videos.map(video => {
      return <SliderCard video={video} />;
    });
  } else {
    children = <EmptyLabel>Sem vídeos nesta lista</EmptyLabel>;
  }

  return (
    <Carousel
      emulateTouch
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      showArrows={false}
      width="100%"
      className="carousel"
    >
      {children}
    </Carousel>
  );
};

export default withRouter(Carousels);
