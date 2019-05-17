import React, { Component } from 'react';
import './Home.css';

import { withFirebase } from '../../Firebase';

import Header from '../../components/Header/Header';
import HomeFilms from '../../components/HomeFilms/HomeFilms';
import Carousel from '../../components/Carousel/Carousel';
import EventsList from '../../components/EventsList/EventsList';
// import { Thumbs } from 'react-responsive-carousel';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      recentsVideos: [],
      error: null
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const { firebase } = this.props;

    this.listener = firebase.video.get(null, videos => {
      this.setState({ recentsVideos: videos, loading: false });
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.video.turnOff();
  }

  render() {
    const { recentsVideos, loading } = this.state;
    return (
      <div className="container">
        {/* <Header>Tem vídeo novo na área</Header>

        {loading ? (
          <p>Carregando vídeos</p>
        ) : (
            <Carousel videos={recentsVideos} />
          )} */}
        <div className="bannersHome">
          <HomeFilms />
          <EventsList />
        </div>

        {/* <EventsList />

        <Header>Os mais assistidos</Header>
        <Carousel /> */}
        {/* <article className="line" /> */}
      </div>
    );
  }
}

export default withFirebase(Home);
