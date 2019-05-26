import React from 'react';
import './TabBarPlayer.css';

import VideoInfo from '../VideoInfo/VideoInfo';

import back from './assets/back.svg';
import next from './assets/next.svg';
import film from '../../../assets/birdbox.jpg';

const TabBarPlayer = () => {
    return (
        <div className="TabBarPlayer">
            <img src={back} className="iconBack" />
            <div>
                <VideoInfo />
            </div>
            <div className="containerNextFilm">
                <h1 className="nextVideo">Assistir ao próximo vídeo</h1>
                <article><img src={film} /></article>
                <img src={next} />
            </div>
        </div>
    );
};

export default TabBarPlayer;
