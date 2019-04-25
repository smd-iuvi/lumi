import React, { Component } from 'react';

import './styles/Home.css';

import Header from '../components/Header/Header';
import Navbar from '../components/NavBar/NavBar';
import Carousel from '../components/Carousel/Carousel';
import Event from '../components/Event/Event';
import Footer from '../components/Footer/Footer';

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
          <Header>Tem vídeo novo na área</Header>
          <Carousel/>

          <Header>Próximos lançamentos</Header>
          <div className="containerEvents">
            <article className="borderLeft"></article>
            <Event/>
            <Event/>
            <Event/>
            
            <article className="borderRight"></article>
          </div>

          <Header>Os mais assistidos</Header>
          <Carousel/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Home;
