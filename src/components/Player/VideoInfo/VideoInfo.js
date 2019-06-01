import React from 'react';
import './VideoInfo.css';

import ParentalRating from '../ParentalRating/ParentalRating';

const VideoInfo = () => {
    return (
        <div className="VideoInfo">
            <h1 className="Large-Text-Bold">A Viagem de Chihiro</h1>
            <div>
                <h1 className="disciplineName Small-Text-Bold">Narrativas Multimídia</h1>
                <h1 className="Small-Text-Regular">2015</h1>
                <h1 className="Small-Text-Regular">Animação</h1>
                <ParentalRating age="Livre" content="Conteúdo sexual, consumo de drogas lícitas e violência." />
            </div>
        </div>
    );
};

export default VideoInfo;
