import React from 'react';
import './VideoInfo.css';

import ParentalRating from '../ParentalRating/ParentalRating';

const VideoInfo = ({
  title = 'Indisponível',
  discipline = 'Vídeo independente',
  semester = 'Indisponível',
  genre = 'Sem gênero',
  parentalRating = 'Livre'
}) => {
  return (
    <div className="VideoInfo">
      <h1 className="Large-Text-Bold">{title}</h1>
      <div>
        <h1 className="disciplineName Small-Text-Bold">{discipline}</h1>
        <h1 className="Small-Text-Regular">{semester}</h1>
        <h1 className="Small-Text-Regular">{genre}</h1>
        <ParentalRating
          age={parentalRating}
          content="Conteúdo sexual, consumo de drogas lícitas e violência."
        />
      </div>
    </div>
  );
};

export default VideoInfo;
