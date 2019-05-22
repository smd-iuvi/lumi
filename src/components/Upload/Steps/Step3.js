import React from 'react';

import './Steps.css';

import bone from './assets/bone.svg';
import chap from './assets/chap-formatura.svg';

const Step3 = (props) => {
    return (
        <div className="Steps">
            <h1 className="titleStep">Tipo do vídeo</h1>
            <article className="line"></article>
            <h1 className="subtitleStep">Escolha uma das opções.</h1>
            <div className="optionsStep">
                <div className="optionLeft">
                    <img src={bone} />
                    <h1 className="titleStep2">Trabalho independente</h1>
                    <h1 className="subtitleStep">Fiz esse video por conta própria</h1>
                </div>
                <div>
                    <img src={chap} />
                    <h1 className="titleStep2">Trabalho de disciplina</h1>
                    <h1 className="subtitleStep">Fiz esse video para uma disciplina</h1>
                </div>
            </div>
        </div>
    );
};

export default Step3;
