import React from 'react';
import './VideoInfo.css';

const VideosInfo = ({ label, value }) => {
  return (
    <div className="Info">
      <h1 className="textInfo titleInfo">{label}</h1>
      <h1 className="textInfo">{value}</h1>
    </div>
  );
};

export default VideosInfo;
