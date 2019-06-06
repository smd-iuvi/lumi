import React from 'react';
import { withRouter } from 'react-router-dom';
import './TabBarPlayer.css';

import VideoInfo from '../VideoInfo/VideoInfo';

import next from './assets/next.svg';
import film from '../../../assets/birdbox.jpg';

const back = history => {
  history.goBack();
};

const TabBarPlayer = ({ video, history }) => {
  return (
    <div className="TabBarPlayer">
      <article className="iconBack" onClick={() => back(history)} />
      <div>
        <VideoInfo
          title={video ? video.title : null}
          discipline={video ? video.discipline : null}
          semester={video ? video.semester : null}
          genre={video ? video.genre : null}
          parentalRating={video ? video.parentalRating : null}
        />
      </div>
      <div className="containerNextFilm">
        <h1 className="Medium-Text-Bold">Assistir ao próximo vídeo</h1>
        <article className="imgNextVideo">
          <img src={film} />
        </article>
        <article className="iconNext" />
      </div>
    </div>
  );
};

export default withRouter(TabBarPlayer);
