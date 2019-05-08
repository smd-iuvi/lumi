import React from 'react';
import './Tags.css';
import SessionTitle from '../SessionTitle/SessionTitle';

const Tags = () => {
    return (
      <div>
        <SessionTitle>Tags deste vídeo</SessionTitle>
        <div className="Tags">
          <article className="tag Tags-Label">thriller</article>
          <article className="tag Tags-Label">sobrevivência</article>
          <article className="tag Tags-Label">apocalipse</article>
          <article className="tag Tags-Label">distopia</article>
          <article className="tag Tags-Label">ficção científica</article>
          <article className="tag Tags-Label">mãe</article>
          <article className="tag Tags-Label">protagonista feminina</article>
        </div>
      </div>
    );
}

export default Tags;
