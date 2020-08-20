import React, { useState } from 'react';

import './EventsControll.css';

import { withFirebase } from '../../Firebase';

import Event from './Event/Event';
import ManageEvent from './ManageEvent/ManageEvent';
import EmptyLabel from '../EmptyLabel/EmptyLabel';

function EventsControll(props) {
  const [manageEvent, setManageEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  function goEvent(event = null) {
    setManageEvent(!manageEvent);
    setSelectedEvent(event);
  };

  const { events, loading, onDelete } = props;
  let container = null;

  if (manageEvent) {
    container = (
      <>
        <ManageEvent event={selectedEvent} back={goEvent} />
      </>
    );
  } else {
    let children = null;
    if (loading) {
      children = <EmptyLabel>Carregando...</EmptyLabel>;
    } else if (events !== null) {
      children = events.map(event => (
        <Event
          event={event}
          goEvent={() => goEvent(event)}
          onDelete={() => onDelete(event.uid)}
        />
      ));
    } else {
      children = <EmptyLabel>Você ainda não criou algum evento</EmptyLabel>;
    }

    container = (
      <>
        <div className="EventInfo EventLabels">
          <h1 className="Small-Text-Regular">Nome</h1>
          <h1 className="Small-Text-Regular">Disciplina</h1>
          <h1 className="Small-Text-Regular">Data</h1>
          <h1 className="Small-Text-Regular">Vídeos cadastrados</h1>
        </div>
        <article className="line" />
        {children}
      </>
    );
  }
  return <div className="EventsControll">{container}</div>;
}

export default withFirebase(EventsControll);
