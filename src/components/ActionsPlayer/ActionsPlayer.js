import React from 'react';
import './ActionsPlayer.css';
import addList from '../../assets/icons/add_list.svg';
import share from '../../assets/icons/share_button.svg';
import applause from '../../assets/icons/clap_button.svg';

const ActionsPlayer = () => {
    return (
        <div className="Actions ActionsPlayer">
            <img src={addList} className="Icons"/>
            <img src={share} className="Icons"/>
            <div>
            <img src={applause} className="Icons"/>
            <h1 className="Actions-Video">5.2k {<br/>} aplausos</h1>
            </div>
        </div>
    );
}

export default ActionsPlayer;
