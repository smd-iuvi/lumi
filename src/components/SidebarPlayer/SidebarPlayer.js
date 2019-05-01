import React from 'react';
import SessionTitle from '../SessionTitle/SessionTitle';
import Producers from './Producers/Producers';
import Tags from '../Tags/Tags';
import './SidebarPlayer.css';

import Film from '../../assets/birdbox.jpg';

const SidebarPlayer = () => {
    return (
      <div className="SidebarPlayer">
        <SessionTitle>Assista em seguida</SessionTitle>
        <div className="nextFilm">
          <img src={Film} className="imgNextFilm"/>
          <h1 className="Next-Film">Bird Box</h1>
          <h1 className="Views-Film">5084 {<br/>} visualizações</h1>
        </div>
        <SessionTitle>Conheça quem fez o vídeo</SessionTitle>
        <Producers/>
        <SessionTitle>Tags deste vídeo</SessionTitle>
        <Tags/>
      </div>
    );
}

export default SidebarPlayer;
