import React, { Component } from 'react';
import uuid from 'uuid';

import './Upload.css';

import iconX from './assets/x.svg';

import { withFirebase } from '../../Firebase';

import Header from '../Header/Header';
import StepBar from './StepBar/StepBar';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import Step5 from './Steps/Step5';
import { isNull } from 'util';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      uploadingImage: false,
      fileToUpload: null,
      steps: [
        {
          title: {
            value: '',
            isValid: null
          },
          imageUrl: {
            value: null,
            isValid: null
          },
          link: {
            value: '',
            isValid: null
          },
          description: {
            value: '',
            isValid: null
          },
          genre: {
            value: '',
            isValid: null
          },
          parentalRating: {
            value: 'Livre',
            isValid: true
          },
          content: {
            value: '',
            isValid: null
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
          isIndependent: {
            value: null,
            isValid: null
          }
        },
        {
          discipline: {
            value: '',
            isValid: null
          },
          semester: {
            value: '',
            isValid: null
          },
          professor: {
            value: '',
            isValid: null
          },
          about: {
            value: '',
            isValid: null
          },
          events: {
            value: '',
            isValid: null
          },
          shouldVerifyEvents: {
            value: false,
            isValid: true
          }
        }
      ]
    };
  }

  onChange = e => {
    const { steps, step } = this.state;
    const currentStepState = steps[step - 1];
    const newCurrentStepState = {
      ...currentStepState,
      [e.target.name]: {
        value:
          e.target.name == 'shouldVerifyEvents'
            ? e.target.checked
            : e.target.value,
        isValid: this.isValid(e)
      }
    };
    const newSteps = [...steps];
    newSteps[step - 1] = newCurrentStepState;
    this.setState({ steps: newSteps });
  };

  onFileChange = event => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState({ fileToUpload: image, uploadingImage: true });
      this.onUpload(image);
    }
  };

  onUpload = image => {
    const { firebase } = this.props;
    firebase
      .upload(image, 'thumbnail', snapshot => console.log(snapshot))
      .then(url => {
        const { steps, step } = this.state;
        const currentStepState = steps[step - 1];
        const newCurrentStepState = {
          ...currentStepState,
          imageUrl: { value: url, isValid: true }
        };
        const newSteps = [...steps];
        newSteps[step - 1] = newCurrentStepState;

        this.setState({ steps: newSteps });
      })
      .catch(error => console.log(error));
  };

  isValid = e => {
    if (e.target.name == 'link') {
      if (
        e.target.value.startsWith('https://www.youtube.com/watch?v=') ||
        e.target.value.startsWith('http://www.youtube.com/watch?v=') ||
        e.target.value.startsWith('www.youtube.com/watch?v=') ||
        e.target.value.startsWith('youtube.com/watch?v=') ||
        e.target.value.startsWith('https://vimeo.com') ||
        e.target.value.startsWith('http://vimeo.com') ||
        e.target.value.startsWith('https://www.vimeo.com') ||
        e.target.value.startsWith('http://www/vimeo.com') ||
        e.target.value.startsWith('www.vimeo.com') ||
        e.target.value.startsWith('vimeo.com')
      ) {
        return true;
      }
    } else if (
      e.target.name == 'tags' ||
      e.target.name == 'cast' ||
      e.target.name == 'members' ||
      e.target.name == 'isIndependent'
    ) {
      return true;
    } else {
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

  canChangeStep = () => {
    const { steps, step } = this.state;
    const currentStepState = steps[step - 1];

    let shouldVerifyEvents = false;
    if (step == 4) {
      shouldVerifyEvents = currentStepState.shouldVerifyEvents.value;
    }

    return Object.keys(currentStepState)
      .map(key => {
        if (key == 'events' && !shouldVerifyEvents) {
          return true;
        }
        return currentStepState[key].isValid;
      })
      .reduce((accumulator, current) => {
        return current && accumulator;
      }, true);
  };

  closeModal = () => {
    this.props.onChangeState();
  };

  nextStep = () => {
    if (this.canChangeStep()) {
      this.setState({ step: this.state.step + 1 });
    } else {
      this.highlightInvalidFields();
    }
  };

  highlightInvalidFields = () => {
    const { steps, step } = this.state;
    const currentStepState = steps[step - 1];

    const newCurrentStepStateArr = Object.keys(currentStepState).map(key => {
      let obj = {};
      obj[key] = {
        ...currentStepState[key],
        isValid:
          currentStepState[key].isValid == null
            ? false
            : currentStepState[key].isValid
      };
      return obj;
    });

    let newCurrentStepState = {};
    newCurrentStepStateArr.forEach(k => {
      newCurrentStepState = { ...newCurrentStepState, ...k };
    });

    const newSteps = [...steps];
    newSteps[step - 1] = newCurrentStepState;
    this.setState({ steps: newSteps });
  };

  returnStep = () => {
    this.setState({ step: this.state.step - 1 });
  };

  resetSteps = () => {
    this.setState({ step: 1 });
  };

  render() {
    const { steps, uploadingImage } = this.state;
    console.log(steps);
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
                <Step1
                  stepState={steps[0]}
                  onChange={this.onChange}
                  onFileChange={this.onFileChange}
                  uploading={uploadingImage}
                />
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

export default withFirebase(Upload);
