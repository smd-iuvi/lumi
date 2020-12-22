import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './TabBarPlayer.css';

import VideoInfo from '../VideoInfo/VideoInfo';

import * as ROUTES from '../../../constants/routes';

const back = history => {
  history.goBack();
};

const TabBarPlayer = ({ video, nextVideo, history, viewsLabel }) => {
  return (
    <div className="TabBarPlayer">
      <article className="iconBack" onClick={() => back(history)} />
      <div>
        <VideoInfo
          title={video ? video.title : null}
          discipline={video && video.discipline ? `Disciplina: ${video.discipline.name}` : null}
          semester={video && video.semester ? `Semestre: ${video.semester.year}.${video.semester.part}` : null}
          genre={video && video.genre ? `Gênero: ${video.genre.name}` : null}
          parentalRating={video && video.parentalRating ? video.parentalRating : null}
          content={video && video.content ? video.content : null}
          viewsLabel={viewsLabel}
        />
      </div>
      <div className="containerNextFilm">
        <h1 className="Medium-Text-Bold">Assistir ao próximo vídeo</h1>
        <article className="imgNextVideo">
          <img src={nextVideo ? nextVideo.imageUrl : null} />
        </article>
        <Link
          to={`${ROUTES.PLAYER}/${nextVideo ? nextVideo.uid : null}`}
          style={{ textDecoration: 'none' }}
        >
          <article className="iconNext" />
        </Link>
      </div>
    </div>
  );
};

export default withRouter(TabBarPlayer);
