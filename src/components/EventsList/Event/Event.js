import React, { Component } from 'react';

import './Event.css';

class Event extends Component {
  render() {
    const { event } = this.props;
    return (
      <div className="Event">
        <div className="eventDate">
          <h1 className="Event-Day">{new Date(event.date).getDay()}</h1>
          <h1 className="Event-Month">{new Date(event.date).getMonth()}</h1>
        </div>
        <div>
          <h1 className="Medium-Text-Bold">{event.name}</h1>
          <h1 className="Medium-Text-Regular">{event.description}</h1>
        </div>
      </div>
    );
  }
}

export default Event;
