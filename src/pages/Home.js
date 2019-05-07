import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import Header from '../components/Header/Header';
import Navbar from '../components/NavBar/NavBar';
import Carousel from '../components/Carousel/Carousel';
import EventsList from '../components/EventsList/EventsList';
import Footer from '../components/Footer/Footer';
import { Thumbs } from 'react-responsive-carousel';

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
    return (
      <div>
        <Navbar />
        <div className="container">
          <Header>Tem vídeo novo na área</Header>
          <Carousel />

          <Header>Próximos lançamentos</Header>
          <EventsList />

          <Header>Os mais assistidos</Header>
          <Carousel />
          <article className="line" />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withFirebase(Home);
