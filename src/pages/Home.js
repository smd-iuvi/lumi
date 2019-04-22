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
          <h1 className="Heading">Próximos Lançamentos</h1>
          <h1 className="Heading">Os mais assistidos</h1>
          <Carousel></Carousel>
        </div>
        <footer>© 2019 Lumi</footer>
      </div>
    );
  }
}

export default Home;
