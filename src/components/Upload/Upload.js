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
      step: 1,
      steps: [
        {
          title: {
            value: '',
            isValid: true
          },
          link: {
            value: '',
            isValid: true
          },
          description: {
            value: '',
            isValid: true
          },
          genre: {
            value: '',
            isValid: true
          },
          parentalRating: {
            value: 'Livre',
            isValid: true
          },
          content: {
            value: '',
            isValid: true
          },
          tags: {
            value: [],
            isValid: true
          }
        },
        {
          cast: {
            value: [],
            isValid: true
          },
          members: {
            value: [],
            isValid: true
          }
        },
        {
          isIdenpendent: {
            value: false,
            isValid: false
          }
        },
        {
          discipline: {
            value: '',
            isValid: true
          },
          semester: {
            value: '',
            isValid: true
          },
          professor: {
            value: '',
            isValid: true
          },
          about: {
            value: '',
            isValid: true
          },
          event: {
            value: '',
            isValid: true
          }
        }
      ]
    };
  }

  onChange = e => {
    const { steps, step } = this.state;
    const currentStepsState = steps[step - 1];
    const newCurrentStepsState = {
      ...currentStepsState,
      [e.target.name]: { value: e.target.value, isValid: this.isValid(e) }
    };
    const newSteps = [...steps];
    newSteps[step - 1] = newCurrentStepsState;
    console.log(newSteps);
    this.setState({ steps: newSteps });
  };

  isValid = e => {
    if (e.target.name !== 'link') {
      if (
        e.target.value != null &&
        e.target.value != undefined &&
        e.target.value != ''
      ) {
        return true;
      }
    }
    return false;
  };

  closeModal = () => {
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
    const { steps } = this.state;
    if (!this.props.show) {
      return null;
    }
    return (
      <div>
        <div className="backgroundModal" onClick={this.closeModal} />
        <div className="modalUpload">
          <div className="labelModal">
            <Header>Enviar vídeo</Header>
            <img src={iconX} className="closeModal" onClick={this.closeModal} />
          </div>
          {this.state.step <= 5 && (
            <div className="contentModal">
              {this.state.step < 5 && <StepBar step={this.state.step} />}
              {this.state.step == 1 && (
                <Step1 stepState={steps[0]} onChange={this.onChange} />
              )}
              {this.state.step == 2 && (
                <Step2 stepState={steps[1]} onChange={this.onChange} />
              )}
              {this.state.step == 3 && (
                <Step3 stepState={steps[2]} onChange={this.onChange} />
              )}
              {this.state.step == 4 && (
                <Step4 stepState={steps[3]} onChange={this.onChange} />
              )}
              {this.state.step == 5 && <Step5 resetSteps={this.resetSteps} />}
            </div>
          )}
          <div className="handleSteps">
            {this.state.step > 1 && this.state.step < 5 && (
              <button
                className="button buttonSecundary"
                onClick={this.returnStep}
              >
                Anterior
              </button>
            )}
            {this.state.step < 4 && (
              <button className="button buttonPrimary" onClick={this.nextStep}>
                Próximo
              </button>
            )}
            {this.state.step == 4 && (
              <button className="button buttonPrimary" onClick={this.nextStep}>
                Concluir
              </button>
            )}
            {this.state.step == 5 && (
              <button
                className="button buttonPrimary"
                onClick={this.closeModal}
              >
                Ok
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
