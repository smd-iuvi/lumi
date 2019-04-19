import React, { Component } from 'react';
import '../components/Carousel.css';
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from 'react-responsive-carousel';
import birdbox from '../assets/birdbox.jpg';

class Carousels extends Component {
  render() {
    return (
        <Carousel emulateTouch centerMode showStatus={false} showIndicators={false} showThumbs={false} width="100%" className="carousel">
            <div className="card">
                <img src={birdbox} />
            </div>
            <div className="card">
                <img src={birdbox} />
            </div>
            <div className="card">
                <img src={birdbox} />
            </div>
            <div className="card">
                <img src={birdbox} />
            </div>
            <div className="card">
                <img src={birdbox} />
            </div>
        </Carousel>
    );
  }
}

export default Carousels;
