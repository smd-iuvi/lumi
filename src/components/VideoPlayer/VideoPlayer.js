import React from 'react';

import './VideoPlayer.css';

import ActionsPlayer from '../ActionsPlayer/ActionsPlayer';

const VideoPlayer = () => {
  return (
    <div className="videoPlayer">
      <iframe
        src="https://www.youtube.com/embed/bo_efYhYU2A"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen"
        msallowfullscreen="msallowfullscreen"
        oallowfullscreen="oallowfullscreen"
        webkitallowfullscreen="webkitallowfullscreen"
      />
      <h1 className="Title-Film title">Bird Box</h1>
      <h1 className="Views-Film">5092 visualizações</h1>
      <ActionsPlayer />
    </div>
  );
};

export default VideoPlayer;
