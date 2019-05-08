import React, { Component } from 'react';

import * as ROUTES from '../../constants/routes';

import './Carousel.css';
import 'react-responsive-carousel/lib/styles/carousel.css';
import { Carousel } from 'react-responsive-carousel';

import SliderCard from '../SliderCard/SliderCard';

import birdbox from '../../assets/birdbox.jpg';

class Carousels extends Component {
  render() {
    const { videos } = this.props;
    let videoList = null;

    if (videos != null) {
      videoList = videos.map(video => {
        return <SliderCard video={video} />;
      });
    }

    return (
      <Carousel
        emulateTouch
        centerMode
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        width="100vw"
        className="carousel"
      >
        {videos && videoList}
      </Carousel>
    );
  }
}

export default Carousels;
