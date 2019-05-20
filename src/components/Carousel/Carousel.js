import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import './Carousel.css';
import 'react-responsive-carousel/lib/styles/carousel.css';
import { Carousel } from 'react-responsive-carousel';

import SliderCard from '../SliderCard/SliderCard';

class Carousels extends Component {
  onWatch = uid => {
    const { history } = this.props;
    history.push(`${ROUTES.VIDEO}/${uid}`);
  };

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
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        width="100%"
        className="carousel"
      >
        {videoList}
      </Carousel>
    );
  }
}

export default withRouter(Carousels);
