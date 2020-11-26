import React from 'react';
import ReactPlayer from 'react-player';

import './VideoPlayer.css';

const VideoPlayer = ({
  url,
  onProgress,
  onDuration
}) => {
  return (
    <div className="videoPlayer">
      <ReactPlayer
        url={url}
        controls
        onProgress={onProgress}
        onDuration={onDuration}
        className="player"
        width="100%"
        height={window.innerWidth < 800 ? "35vh" : "60vh"}
      />
    </div>
  );
};

export default VideoPlayer;
