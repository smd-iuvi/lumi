import React from 'react';

import './Steps.css';

import videoEnviado from './assets/video_enviado.svg';

function Step5(props) {
    function reset() {
        props.resetSteps()
    }

    return (
        <div className="Steps">
            <div className="finishStep">
                <img src={videoEnviado} />
                <h1 className="Large-Text-Medium">Sucesso! Seu vídeo foi enviado e está aguardando revisão para ser publicado :)</h1>
                <button className="button buttonSecundary" onClick={reset}>Enviar outro vídeo</button>
            </div>
        </div>
    );
}

export default Step5;
