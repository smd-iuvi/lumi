import React, { Component } from 'react';

import './Steps.css';

import videoEnviado from './assets/video_enviado.svg';

class Step5 extends Component {
    reset = () => {
        this.props.resetSteps()
    }
    render() {
        return (
            <div className="Steps">
                <div className="finishStep">
                    <img src={videoEnviado} />
                    <h1 className="titleStep">Sucesso! Seu vídeo foi enviado e está aguardando revisão para ser publicado :)</h1>
                    <button className="button buttonSecundary" onClick={this.reset}>Enviar outro vídeo</button>
                </div>
            </div>
        );
    }
};

export default Step5;
