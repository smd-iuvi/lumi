import React from 'react';

import './Steps.css';

import bone from './assets/bone.svg';
import chap from './assets/chap-formatura.svg';

const Step3 = (props) => {
    return (
        <div className="Steps">
            <h1 className="Large-Text-Medium">Tipo do vídeo</h1>
            <article className="line"></article>
            <h1 className="subtitleStep Small-Text-Regular">Escolha uma das opções.</h1>
            <div className="optionsStep">
                <div className="optionLeft">
                    <img src={bone} />
                    <h1 className="Medium-Text-Medium">Trabalho independente</h1>
                    <h1 className="subtitleStep Small-Text-Regular">Fiz esse video por conta própria</h1>
                </div>
                <div>
                    <img src={chap} />
                    <h1 className="Medium-Text-Medium">Trabalho de disciplina</h1>
                    <h1 className="subtitleStep Small-Text-Regular">Fiz esse video para uma disciplina</h1>
                </div>
            </div>
        </div>
    );
};

export default Step3;
