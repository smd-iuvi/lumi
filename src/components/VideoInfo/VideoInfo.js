import React from 'react';
import './VideoInfo.css';

const VideosInfo = (props) => {
    return (
        <div className="Info">
            <h1 className="textInfo titleInfo">{props.label}</h1>
            <h1 className="textInfo">valor da informacao</h1>
        </div>
    );
}

export default VideosInfo;
