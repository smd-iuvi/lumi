import React from 'react';

import Header from '../components/Header/Header';
import Navbar from '../components/NavBar/NavBar';
import Carousel from '../components/Carousel/Carousel';
import EventsList from '../components/EventsList/EventsList';
import Footer from '../components/Footer/Footer';

const Home = () => {
    return (
      <div>
        <Navbar/>
        <div className="container">
          <Header>Tem vídeo novo na área</Header>
          <Carousel/>

          <Header>Próximos lançamentos</Header>
          <EventsList/>

          <Header>Os mais assistidos</Header>
          <Carousel/>
          <article className="line"></article>
        </div>
        <Footer/>
      </div>
    );
}

export default Home;
