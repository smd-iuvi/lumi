import React from 'react';

import Event from './Event/Event';
import Header from '../Header/Header';
import EventEmptyState from './assets/event_empty_state.svg';

import './EventsList.css';
import EmptyState from '../EmptyState/EmptyState';

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

      {firstList && firstList.length !== 0 ?
        <>
          <h1 className="Month Small-Text-Bold">NESTE MÊS</h1>
          {firstList.map(event => <Event event={event} />)}
        </>
        :
        <EmptyState image={EventEmptyState} description={
          <h1 className="Small-Text-Regular">Eventos são como os trabalhos de disciplinas criados por professores. No momento não há nenhum evento agendado.</h1>
        } />
      }
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
