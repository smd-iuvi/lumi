import React, { Component } from 'react';
import './styles/Home.css';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Event from '../components/Event';

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
          <h1 className="Heading">Tem vídeo novo na área</h1>
          <Carousel/>

          <h1 className="Heading">Próximos lançamentos</h1>
          <div className="containerEvents">
            <article className="borderLeft"></article>
            <Event/>
            <Event/>
            <Event/>
            
            <article className="borderRight"></article>
          </div>

          <h1 className="Heading moreViews">Os mais assistidos</h1>
          <Carousel/>
        </div>
        <footer>© 2019 Lumi</footer>
      </div>
    );
  }
}

export default Home;
