import React from 'react';
import './TabBarPlayer.css';

import VideoInfo from '../VideoInfo/VideoInfo';

import next from './assets/next.svg';
import film from '../../../assets/birdbox.jpg';

const TabBarPlayer = () => {
    return (
        <div className="TabBarPlayer">
            <article className="iconBack" />
            <div>
                <VideoInfo />
            </div>
            <div className="containerNextFilm">
                <h1 className="Medium-Text-Bold">Assistir ao próximo vídeo</h1>
                <article className="imgNextVideo"><img src={film} /></article>
                <article className="iconNext" />
            </div>
        </div>
    );
};

export default TabBarPlayer;
