import React from 'react';
import './ActionsPlayer.css';

const ActionsPlayer = ({ didClap, claps, didAddToWatchlist, onWatchList }) => {
  return (
    <div className="Actions ActionsPlayer">
      <div onClick={didClap} className="addClap">
        <article className="Icons iconAplause"></article>
        <h1 className="Small-Text-Bold">Aplaudir</h1>
        <article className="valueClaps Small-Text-Regular">{claps} aplausos</article>
      </div>
      <div onClick={didAddToWatchlist}>
        {onWatchList ?
          <>
            <article className="Icons iconList"></article>
            <h1 className="Small-Text-Bold myList">Remover da lista</h1>
          </>
          :
          <>
            <article className="Icons iconList"></article>
            <h1 className="Small-Text-Bold myList">Minha lista</h1>
          </>
        }
      </div>
      <div>
        <article className="Icons iconShare"></article>
        <h1 className="Small-Text-Bold">Compartilhar</h1>
      </div>
    </div>
  );
};

export default ActionsPlayer;
