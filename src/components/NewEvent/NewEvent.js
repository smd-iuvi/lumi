import React, { Component } from 'react';
import './NewEvent.css';

import { INITIAL_STATE } from './InitialState';

import { withFirebase } from '../../Firebase';
import { withAuthUser } from '../../Firebase/Session';

import Header from '../Header/Header';
import StepBar from './StepBar/StepBar';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';

import iconX from './assets/x.svg';
import { ninvoke } from 'q';

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onFileChange = event => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      if (image.type.includes('image')) {
        this.setState({
          fileToUpload: image,
          uploadingImage: true,
          errorOnImageFile: null
        });
        this.onUpload(image);
      } else {
        this.setState({
          errorOnImageFile: {
            message: 'Arquivo inválido. Escolha uma imagem'
          }
        });
      }
    }
  };

  onUpload = image => {
    const { firebase } = this.props;
    firebase
      .upload(image, 'event', snapshot => console.log(snapshot))
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

  onChange = e => {
    const { steps, step } = this.state;
    const currentStepState = steps[step - 1];
    const newCurrentStepState = {
      ...currentStepState,
      [e.target.name]: {
        value: e.target.value,
        isValid: this.isValid(e)
      }
    };
    const newSteps = [...steps];
    newSteps[step - 1] = newCurrentStepState;
    this.setState({ steps: newSteps });
  };

  isValid = e => {
    if (
      e.target.value !== null &&
      e.target.value !== undefined &&
      e.target.value !== ''
    ) {
      return true;
    }
    return false;
  };

  canChangeStep = () => {
    const { steps, step } = this.state;
    const currentStepState = steps[step - 1];

    return Object.keys(currentStepState)
      .map(key => {
        return currentStepState[key].isValid;
      })
      .reduce((accumulator, current) => {
        return current && accumulator;
      }, true);
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

  onSend = () => {
    const { firebase, authUser } = this.props;
    const { steps } = this.state;

    this.setState({ sending: true });

    const event = {
      name: steps[0].name.value,
      imageUrl: steps[0].imageUrl.value,
      discipline: steps[0].discipline.value,
      semester: steps[0].semester.value,
      description: steps[0].description.value,
      date: steps[1].date.value.toLocaleDateString('pt-BR'),
      createdBy: authUser.uid
    };

    firebase.event
      .create(event)
      .then(() => {
        console.log('Criado');
        this.setState({ sending: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error });
      });
  };

  closeModal = () => {
    this.setState(INITIAL_STATE);
    this.props.onChangeState();
  };

  nextStep = () => {
    if (this.canChangeStep()) {
      this.setState({ step: this.state.step + 1 });
    } else {
      console.log('PORRA');
      this.highlightInvalidFields();
    }
  };

  returnStep = () => {
    this.setState({ step: this.state.step - 1 });
  };

  resetSteps = () => {
    this.setState(INITIAL_STATE);
  };

  render() {
    const { steps, uploadingImage, errorOnImageFile } = this.state;
    if (!this.props.show) {
      return null;
    }

    console.log(steps);
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
                <Step1
                  stepState={steps[0]}
                  onChange={this.onChange}
                  onFileChange={this.onFileChange}
                  error={errorOnImageFile}
                  uploading={uploadingImage}
                />
              )}
              {this.state.step === 2 && (
                <Step2 stepState={steps[1]} onChange={this.onChange} />
              )}
              {this.state.step === 3 && <Step3 resetSteps={this.resetSteps} />}
            </div>
          )}
          <div className="handleSteps">
            {this.state.step === 2 && (
              <button
                className="button buttonSecundary"
                onClick={this.returnStep}
              >
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

export default withAuthUser(withFirebase(NewEvent));
