import React, { Component } from 'react';
import './Home.css';

import { withFirebase } from '../../Firebase';

import HomeFilms from '../../components/HomeFilms/HomeFilms';
import Carousel from '../../components/Carousel/Carousel';
import EventsList from '../../components/EventsList/EventsList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingRecents: false,
      loadingPopulars: false,
      loadingEvents: false,
      recentsVideos: [],
      popularsVideos: [],
      events: null,
      error: null
    };
  }

  componentDidMount() {
    this.setState({ loadingRecents: true, loadingPopulars: true });
    const { firebase } = this.props;

    firebase.video
      .get()
      .then(videos => {
        this.setState({ recentsVideos: videos, loadingRecents: false });
      })
      .catch(error => {
        this.setState({ error, loadingRecents: false });
      });

    firebase.video
      .getPopulars(4)
      .then(videos => {
        this.setState({ popularsVideos: videos, loadingPopulars: false });
      })
      .catch(error => {
        this.setState({ error, loadingPopulars: false });
      });

    firebase.event
      .getNext(3)
      .then(events => {
        console.log(events);
        this.setState({ events });
      })
      .catch(error => this.setState({ error }));
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.video.turnOff();
  }

  render() {
    const {
      recentsVideos,
      loadingRecents,
      popularsVideos,
      loadingPopulars,
      loadingEvents,
      events
    } = this.state;

    return (
      <div className="container">
        <Carousel videos={recentsVideos} loading={loadingRecents} />
        <div className="bannersHome">
          <HomeFilms videos={popularsVideos} loading={loadingPopulars} />
          <EventsList events={events} loading={loadingEvents} />
        </div>
      </div>
    );
  }
}

export default withFirebase(Home);
