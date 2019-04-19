import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel'

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
          <h1 className="Heading">Tem vídeo novo na área</h1>
          <Carousel></Carousel>
        </div>
      </div>
    );
  }
}

export default Home;
