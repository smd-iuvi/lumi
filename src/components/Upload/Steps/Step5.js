import React from 'react';

import './Steps.css';

import videoEnviado from './assets/video_enviado.svg';

const Step5 = (props) => {
    return (
        <div className="Steps">
            <div className="finishStep">
                <img src={videoEnviado} />
                <h1 className="titleStep">Sucesso! Seu vídeo foi enviado e está aguardando revisão para ser publicado :)</h1>
                <button className="button buttonSecundary">Enviar outro vídeo</button>
            </div>
        </div>
    );
};

export default Step5;
