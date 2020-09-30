import React, { useState, useEffect } from 'react';
import './Home.css';

import { withFirebase } from '../../Firebase';

import HomeFilms from '../../components/HomeFilms/HomeFilms';
import Carousel from '../../components/Carousel/Carousel';
import EventsList from '../../components/EventsList/EventsList';

function Home(props) {
  const [loadingRecents, setLoadingRecents] = useState(false);
  const [loadingPopulars, setLoadingPopulars] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [recentsVideos, setRecentsVideos] = useState([]);
  const [popularsVideos, setPopularsVideos] = useState([]);
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingRecents(true);
    setLoadingPopulars(true);

    const { firebase } = props;

    firebase.video
      .get()
      .then(videos => {
        setRecentsVideos(videos);
        setLoadingRecents(false);
      })
      .catch(error => {
        setError(error);
        setLoadingRecents(false);
      });

    firebase.video
      .getPopulars(10)
      .then(videos => {
        setPopularsVideos(videos);
        setLoadingPopulars(false);
      })
      .catch(error => {
        setError(error);
        setLoadingPopulars(false);
      });

    firebase.event
      .getNext(3)
      .then(events => {
        setEvents(events);
      })
      .catch(error => setError(error));

    return () => {
      const { firebase } = props;
      firebase.video.turnOff();
    }
  }, []);

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

export default withFirebase(Home);
