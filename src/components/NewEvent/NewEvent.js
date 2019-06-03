import React, { Component } from 'react';
import './NewEvent.css';

import Header from '../Header/Header';
import StepBar from './StepBar/StepBar';
import Step2 from './Steps/Step2';

import iconX from './assets/x.svg';

class NewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        };
    }

    closeModal = () => {
        this.setState({ step: 1 });
        this.props.onChangeState();
    };

    nextStep = () => {
        this.setState({ step: this.state.step + 1 });
    };

    returnStep = () => {
        this.setState({ step: this.state.step - 1 });
    };

    resetSteps = () => {
        this.setState({ step: 1 });
    };

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="NewEvent">
                <div className="backgroundModal" onClick={this.closeModal} />
                <div className="modalUpload">
                    <div className="labelModal">
                        <Header>Criar evento</Header>
                        <img
                            src={iconX}
                            className="closeModal"
                            alt="Botão para fechar modal"
                            onClick={this.closeModal}
                        />
                    </div>
                    {this.state.step <= 3 && (
                        <div className="contentModal">
                            {this.state.step < 3 && <StepBar step={this.state.step} />}
                            {this.state.step === 1 && (
                                <h1>passo 1</h1>
                                // <Step1
                                //     stepState={steps[0]}
                                //     onChange={this.onChange}
                                //     onFileChange={this.onFileChange}
                                //     uploading={uploadingImage}
                                // />
                            )}
                            {this.state.step === 2 && (
                                <Step2 />
                            )}
                            {this.state.step === 3 && (
                                <h1>passo final</h1>
                                // <Step3 stepState={steps[2]} onChange={this.onChange} />
                            )}
                        </div>
                    )}
                    <div className="handleSteps">
                        {this.state.step === 2 && (
                            <button
                                className="button buttonSecundary"
                                onClick={this.returnStep}>
                                Anterior
                            </button>
                        )}
                        {this.state.step === 1 && (
                            <button className="button buttonPrimary" onClick={this.nextStep}>
                                Próximo
                            </button>
                        )}
                        {this.state.step === 2 && (
                            <button className="button buttonPrimary" onClick={this.nextStep}>
                                Concluir
                            </button>
                        )}
                        {this.state.step === 3 && (
                            <button
                                className="button buttonPrimary"
                                onClick={this.closeModal} >
                                Ok
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default NewEvent;
