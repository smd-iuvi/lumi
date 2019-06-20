import React from 'react';

import './CardList.css';
import EmptyLabel from '../EmptyLabel/EmptyLabel';
import CardFilm from '../CardFilm/CardFilm';

const pushUpStyle = {
  marginTop: '-50px'
};

const CardList = ({ loading, videos, belowTab = false, type }) => {
  let children = null;

  if (loading) {
    children = <EmptyLabel>Carregando...</EmptyLabel>;
  } else if (videos !== null) {
    children = videos.map(video => <CardFilm video={video} type={type} />);
  } else {
    children = <EmptyLabel>Não há videos nesta lista</EmptyLabel>;
  }

  return (
    <div className="CardList" style={belowTab ? pushUpStyle : {}}>
      {children}
    </div>
  );
};

export default CardList;
