import React from 'react';
import './VideoInfo.css';

import ParentalRating from '../ParentalRating/ParentalRating';

const VideoInfo = ({
  title = 'Indisponível',
  discipline = 'Vídeo independente',
  semester,
  genre,
  parentalRating,
  content
}) => {
  return (
    <div className="VideoInfo">
      <h1 className="Large-Text-Bold">{title}</h1>
      <div>
        {discipline && <h1 className="disciplineName Small-Text-Bold">{discipline}</h1>}
        {semester && <h1 className="Small-Text-Regular">{semester}</h1>}
        {genre && <h1 className="Small-Text-Regular">{genre}</h1>}
        <ParentalRating
          age={parentalRating}
          content={content}
        />
      </div>
    </div>
  );
};

export default VideoInfo;
