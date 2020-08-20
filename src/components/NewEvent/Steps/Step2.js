import React, { useState } from 'react';
import Calendar from 'react-calendar';

import './Steps.css';

function Step2(props) {
  const [date, setDate] = useState(new Date());

  function onChange(date) {
    const { onChange } = props;
    const event = {
      target: {
        name: 'date',
        value: date
      }
    };
    onChange(event);
  };

  const { stepState } = props;
  return (
    <div className="Steps">
      <h1 className="Large-Text-Medium">Data do evento</h1>
      <article className="line" />
      <h1 className="subtitleStep Small-Text-Regular">
        Quando os vídeos desse evento estarão disponíveis para serem
        assistidos?
      </h1>
      <div className="calendar">
        <Calendar onChange={onChange} value={stepState.date.value} />
      </div>
    </div>
  );
}

export default Step2;
