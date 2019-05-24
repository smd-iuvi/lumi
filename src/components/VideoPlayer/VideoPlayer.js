import React from 'react';
import ReactPlayer from 'react-player';

import './VideoPlayer.css';

import ActionsPlayer from '../ActionsPlayer/ActionsPlayer';

const VideoPlayer = ({
  didClap,
  name,
  url,
  views,
  claps,
  didAddToWatchlist,
  onWatchList,
  onProgress,
  onDuration
}) => {
  return (
    <div className="videoPlayer">
      {/* <iframe
        src={embeedUrl}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen"
        msallowfullscreen="msallowfullscreen"
        oallowfullscreen="oallowfullscreen"
        webkitallowfullscreen="webkitallowfullscreen"
        onEnded={onVideoEnd}
      /> */}
      <ReactPlayer
        url={url}
        controls
        onProgress={onProgress}
        onDuration={onDuration}
      />
      <h1 className="Title-Film title">{name}</h1>
      <h1 className="Views-Film">{views} visualizações</h1>
      <ActionsPlayer
        didClap={didClap}
        didAddToWatchlist={didAddToWatchlist}
        claps={claps}
        onWatchList={onWatchList}
      />
    </div>
  );
};

export default VideoPlayer;
