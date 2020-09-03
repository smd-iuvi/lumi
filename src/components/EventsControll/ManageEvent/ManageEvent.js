import React from 'react';

import EventInfos from '../EventInfos/EventInfos';
import VideoEvent from '../VideoEvent/VideoEvent';

import './ManageEvent.css';

function ManageEvent(props) {
  function backPage() {
    props.back();
  };

  const { event } = props;
  return (
    <div className="ManageEvent">
      <article className="iconBack" onClick={backPage} />
      <div>
        <EventInfos event={event} />
        <article className="line" />
        <h1 className="Small-Text-Bold videosEvent">
          VÍDEOS CADASTRADOS NESTE EVENTO
        </h1>
        <div className="EventInfo EventLabels">
          <h1 className="Small-Text-Regular">Nome</h1>
          <h1 className="Small-Text-Regular">Aluno proprietário</h1>
          <h1 className="Small-Text-Regular">Data de envio</h1>
        </div>
        <article className="line" />
        <VideoEvent />
        <VideoEvent />
        <VideoEvent />
      </div>
    </div>
  );
}

export default ManageEvent;
