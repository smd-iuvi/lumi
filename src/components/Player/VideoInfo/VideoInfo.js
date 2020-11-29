import React from 'react';
import './VideoInfo.css';

import ParentalRating from '../ParentalRating/ParentalRating';
import * as ROUTES from '../../../constants/routes';
import { Link } from 'react-router-dom';

const VideoInfo = ({
  title = 'Indisponível',
  discipline = 'Vídeo independente',
  semester,
  genre,
  parentalRating,
  content,
  viewsLabel
}) => {
  return (
    <div className="VideoInfo">
      <h1 className="Large-Text-Bold">{title}</h1>
      <h1 className="Small-Text-Bold views">{viewsLabel} visualizações</h1>
      <div>
        {discipline && <Link
          to={`${ROUTES.CATEGORY}/${discipline}`}
          className="category"
          style={{ textDecoration: 'none', color: 'white' }}
        ><h1 className="disciplineName Small-Text-Bold">{discipline}</h1></Link>}
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
