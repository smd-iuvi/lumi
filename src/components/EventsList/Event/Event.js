import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';

import './Event.css';

function Event(props) {
  const { event } = props;
  return (
    <Link to={ROUTES.EVENT} className="link">
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
    </Link>
  );
}

export default withRouter(Event);
