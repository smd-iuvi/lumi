import React from 'react'

import Event from './Event/Event';
import Header from '../Header/Header';

import './EventsList.css';

const EventsList = () => {
  return (
    <div className="EventsList">
      <div className="titleEventsFilms">
        <Header>Eventos de disciplinas</Header>
        <button className="button buttonPrimary">Ver todos</button>
      </div>
      <article className="line" />
      <h1 className="Month">NESTE MÊS</h1>
      <Event />
      <Event />
      <h1 className="Month">PRÓXIMOS MESES</h1>
      <Event />
    </div>
  )
}

export default EventsList
