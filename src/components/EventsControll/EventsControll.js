import React, { Component } from 'react';

import './EventsControll.css';

import { withFirebase } from '../../Firebase';

import Event from './Event/Event';
import ManageEvent from './ManageEvent/ManageEvent';
import EmptyLabel from '../EmptyLabel/EmptyLabel';

class EventsControll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      manageEvent: false,
      selectedEvent: null
    };
  }

  goEvent = (event = null) => {
    this.setState({
      manageEvent: !this.state.manageEvent,
      selectedEvent: event
    });
  };

  render() {
    const { events, loading, onDelete } = this.props;
    let container = null;

    console.log(events);
    if (this.state.manageEvent) {
      container = (
        <>
          <ManageEvent event={this.state.selectedEvent} back={this.goEvent} />
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
            goEvent={() => this.goEvent(event)}
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
}

export default withFirebase(EventsControll);
