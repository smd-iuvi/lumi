import React from 'react';
import './ActionsPlayer.css';
import addList from './assets/add_list.svg';
import share from './assets/share_button.svg';
import applause from './assets/clap_button.svg';

const ActionsPlayer = () => {
    return (
        <div className="Actions ActionsPlayer">
            <div>
                <img src={addList} className="Icons"/>
                <h1 className="Actions-Video actionDescription">Minha {<br/>} lista</h1>
            </div>
            <div>
                <img src={share} className="Icons"/>
                <h1 className="Actions-Video actionDescription">Compartilhar</h1>
            </div>
            <div className="applauses">
                <img src={applause} className="Icons"/>
                <h1 className="Actions-Video descriptionApplauses">5.2k {<br/>} aplausos</h1>
            </div>
        </div>
    );
}

export default ActionsPlayer;
