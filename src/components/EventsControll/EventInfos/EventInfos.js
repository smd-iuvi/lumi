import React, { Component } from 'react';

import './EventInfos.css';

const EventInfos = ({ event }) => {
  const style = {
    backgroundImage: `url(${event.imageUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  };
  return (
    <div className="infosEvent">
      <div>
        <h1 className="Small-Text-Bold titleManage">GERENCIAR EVENTO</h1>
        <h1 className="Medium-Text-Bold">
          {event.name ? event.name : 'Indisponível'}
        </h1>
        <article className="infosHorizontal">
          <h1 className="Small-Text-Bold">
            {event.discipline ? event.discipline : 'Indisponível'}
          </h1>
          <h1 className="Small-Text-Regular">
            Acontecerá em {event.date ? event.date : 'Indisponível'}
          </h1>
        </article>
        <h1 className="Medium-Text-Regular">
          {event.description ? event.description : 'Indisponível'}
        </h1>
        <button className="button buttonTerceary">Editar informações</button>
      </div>
      <div>
        <article className="bannerEvent" style={style}>
          {/* aqui vai ter a imagem */}
        </article>
      </div>
    </div>
  );
};

export default EventInfos;
