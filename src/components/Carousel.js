import React, { Component } from 'react';
import './styles/Carousel.css';
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from 'react-responsive-carousel';
import birdbox from '../assets/birdbox.jpg';
import { Link } from 'react-router-dom'

class Carousels extends Component {

    render() {
        return (
            <Carousel emulateTouch centerMode showStatus={false} showIndicators={false} showThumbs={false} width="100vw" className="carousel">
                <Link to="/Video"><div className="card">
                    <img src={birdbox} />
                </div></Link>
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
