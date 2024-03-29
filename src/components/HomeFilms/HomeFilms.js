import React from 'react';
import './HomeFilms.css';

import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import CardList from '../CardList/CardList';
import Header from '../Header/Header';
import EmptyLabel from '../EmptyLabel/EmptyLabel';

const HomeFilms = ({ videos, loading }) => {
  let children = null;

  if (loading) {
    children = <EmptyLabel>Carregando...</EmptyLabel>;
  } else if (videos !== null) {
    children = <CardList videos={videos.slice(0, 8)} loading={loading} isScrollable={window.innerWidth < 800} />;
  } else {
    children = <EmptyLabel>Não há videos nesta lista</EmptyLabel>;
  }
  return (
    <div className="HomeFilms">
      <div className="titleHomeFilms">
        <Header>Todos os vídeos</Header>
        <Link to={{
          pathname: ROUTES.VIDEOS_LIST,
          state: { videos: videos, title: 'Todos os vídeos' }
        }}>
          <button className="button buttonSeeMore">Ver todos</button>
        </Link>
      </div>
      <article className="line" />
      <div className="listFilms">{children}</div>
    </div>
  );
};

export default HomeFilms;
