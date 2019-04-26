import React from 'react'

import Event from './Event/Event';

import './EventsList.css';

const EventsList = () => {
  return (
    <div className="EventsList">
        <article className="border borderLeft"></article>
        <div className="Events">
          <Event/>
          <Event/>
          <Event/>
        </div>
        <article className="border borderRight"></article>
    </div>
  )
}

export default EventsList
