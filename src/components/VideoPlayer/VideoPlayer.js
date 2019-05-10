import React from 'react';

import './VideoPlayer.css';

import ActionsPlayer from '../ActionsPlayer/ActionsPlayer';

const VideoPlayer = ({ didClap, name, url, views, claps }) => {
  const urlCode = url.split('=').slice(-1);
  const embeedUrl = `https://www.youtube.com/embed/${urlCode}`;
  console.log(name);

  return (
    <div className="videoPlayer">
      <iframe
        src={embeedUrl}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen"
        msallowfullscreen="msallowfullscreen"
        oallowfullscreen="oallowfullscreen"
        webkitallowfullscreen="webkitallowfullscreen"
      />
      <h1 className="Title-Film title">{name}</h1>
      <h1 className="Views-Film">{views} visualizações</h1>
      <ActionsPlayer didClap={didClap} claps={claps} />
    </div>
  );
};

export default VideoPlayer;
