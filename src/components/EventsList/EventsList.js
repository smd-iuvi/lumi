import React from 'react';

import Event from './Event/Event';
import Header from '../Header/Header';

import './EventsList.css';

const EventsList = ({ events }) => {
  let firstList = null;
  let secondList = null;

  if (events) {
    const monthIndex = events.reduce((accumulator, event) => {
      return new Date(event.date).getMonth() < accumulator
        ? new Date(event.date).getMonth()
        : accumulator;
    }, 12);

    console.log(monthIndex);

    firstList = events.filter(
      event => new Date(event.date).getMonth() === monthIndex
    );

    secondList = events.filter(
      event => new Date(event.date).getMonth() > monthIndex
    );

    console.log(secondList);
  }

  // const first

  return (
    <div className="EventsList">
      <div className="titleEventsFilms">
        <Header>Eventos de disciplinas</Header>
        <button className="button buttonPrimary">Ver todos</button>
      </div>
      <article className="line" />
      <h1 className="Month Small-Text-Bold">NESTE MÊS</h1>
      {firstList && firstList.map(event => <Event event={event} />)}
      {secondList && secondList.length > 0 && (
        <h1 className="Month Small-Text-Bold">PRÓXIMOS MESES</h1>
      )}
      {secondList &&
        secondList.length > 0 &&
        secondList.map(event => <Event event={event} />)}
    </div>
  );
};

export default EventsList;
