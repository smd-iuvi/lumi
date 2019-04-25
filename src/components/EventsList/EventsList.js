import React from 'react'

import Event from './Event/Event';

import './EventsList.css';

const EventsList = () => {
  return (
    <div className="EventsList">
        <article className="borderLeft"></article>
        <Event/>
        <Event/>
        <Event/>
        <article className="borderRight"></article>
    </div>
  )
}

export default EventsList
