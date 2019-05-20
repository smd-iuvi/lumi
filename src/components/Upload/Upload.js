import React, { Component } from 'react';

import './Upload.css';

import iconX from './assets/x.svg';

import Header from '../Header/Header';
import StepBar from './StepBar/StepBar';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import Step5 from './Steps/Step5';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        }
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal = () => {
        this.props.onChangeState();
    };

    nextStep = () => {
        this.setState({ step: this.state.step + 1 })
    }

    returnStep = () => {
        this.setState({ step: this.state.step - 1 })
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div>
                <div className="backgroundModal" onClick={this.closeModal}></div>
                <div className="modalUpload">
                    <div className="labelModal">
                        <Header>Enviar vídeo</Header>
                        <img src={iconX} className="closeModal" onClick={this.closeModal} />
                    </div>
                    {this.state.step <= 5 &&
                        <div className="contentModal">
                            {this.state.step < 5 &&
                                <StepBar step={this.state.step} />
                            }
                            {this.state.step == 1 && <Step1 />}
                            {this.state.step == 2 && <Step2 />}
                            {this.state.step == 3 && <Step3 />}
                            {this.state.step == 4 && <Step4 />}
                            {this.state.step == 5 && <Step5 />}
                        </div>
                    }
                    <div className="handleSteps">
                        {(this.state.step > 1 && this.state.step < 5) &&
                            <button className="button buttonSecundary" onClick={this.returnStep}>Anterior</button>
                        }
                        {this.state.step < 4 &&
                            <button className="button buttonPrimary" onClick={this.nextStep}>Próximo</button>
                        }
                        {this.state.step == 4 &&
                            <button className="button buttonPrimary" onClick={this.nextStep}>Concluir</button>
                        }
                        {this.state.step == 5 &&
                            <button className="button buttonPrimary" onClick={this.closeModal}>Ok</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;
