import React, { Component } from 'react';

import './Steps.css';

import eventoCriado from '../assets/evento-criado.svg';

class Step3 extends Component {
    reset = () => {
        this.props.resetSteps()
    }
    render() {
        return (
            <div className="Steps">
                <div className="finishStep">
                    <img src={eventoCriado} />
                    <h1 className="Large-Text-Medium">
                        Sucesso! O evento foi criado, fique atento(a) às publicações dos seus alunos! :)
                    </h1>
                </div>
            </div>
        );
    }
};

export default Step3;
