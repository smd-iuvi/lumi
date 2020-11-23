import React from 'react';

import './CardList.css';
import EmptyLabel from '../EmptyLabel/EmptyLabel';
import CardFilm from '../CardFilm/CardFilm';

const pushUpStyle = {
  marginTop: '-50px'
};

const CardList = ({ loading, videos, belowTab = false, type, isScrollable = false }) => {
  let children = null;

  if (loading) {
    children = <EmptyLabel>Carregando...</EmptyLabel>;
  } else if (videos !== null) {
    children = videos.map(video => <span className={isScrollable ? "CardMargin" : ""}><CardFilm video={video} type={type} /></span>);
  } else {
    children = <EmptyLabel>Não há videos nesta lista</EmptyLabel>;
  }

  return (
    <>
      {isScrollable ?
        <div className="CardListScrollable" style={belowTab ? pushUpStyle : {}}>
          {children}
        </div>
        :
        <div className="CardList" style={belowTab ? pushUpStyle : {}}>
          {children}
        </div>
      }
    </>
  );
};

export default CardList;
