import React from 'react';
import './ActionsPlayer.css';

const ActionsPlayer = ({ didClap, claps, didAddToWatchlist, onWatchList }) => {
  console.log(onWatchList);
  return (
    <div className="Actions ActionsPlayer">
      <div onClick={didClap}>
        <article className="Icons iconAplause"></article>
        <h1 className="Small-Text-Bold">Aplaudir</h1>
      </div>
      <div onClick={didAddToWatchlist}>
        <article className="Icons iconList"></article>
        <h1 className="Small-Text-Bold myList">Minha lista</h1>
      </div>
      <div>
        <article className="Icons iconShare"></article>
        <h1 className="Small-Text-Bold">Compartilhar</h1>
      </div>
    </div>
  );
};

export default ActionsPlayer;
