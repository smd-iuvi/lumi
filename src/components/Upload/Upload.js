import React, { Component } from 'react';

import './Upload.css';

import iconX from './assets/x.svg';

import { withFirebase } from '../../Firebase';
import { withAuthUser } from '../../Firebase/Session';

import Header from '../Header/Header';
import StepBar from './StepBar/StepBar';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import Step5 from './Steps/Step5';

import { INITIAL_STATE } from './InitialState';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onChange = e => {
    const { steps, step } = this.state;
    const currentStepState = steps[step - 1];
    const newCurrentStepState = {
      ...currentStepState,
      [e.target.name]: {
        value:
          e.target.name === 'shouldVerifyEvents'
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

  cleanMembersUUIDKeys = members => {
    return members.map(member => {
      return { role: member.role, name: member.name };
    });
  };

  onSend = () => {
    const { firebase, authUser } = this.props;
    const { steps } = this.state;

    this.setState({ sending: true });

    const video = {
      title: steps[0].title.value,
      imageUrl: steps[0].imageUrl.value,
      link: steps[0].link.value,
      description: steps[0].description.value,
      genre: steps[0].genre.value,
      parentalRating: steps[0].parentalRating.value,
      content: steps[0].content.value,
      tags: steps[0].tags.value,
      cast: steps[1].cast.value,
      members: this.cleanMembersUUIDKeys(steps[1].members.value),
      isIndependent: steps[2].isIndependent.value,
      discipline: steps[3].discipline.value,
      semester: steps[3].semester.value,
      professor: steps[3].professor.value,
      about: steps[3].about.value,
      event: steps[3].events.value,
      createdBy: authUser.uid
    };

    firebase.video
      .create(video)
      .then(() => {
        console.log('Criado');
        this.setState({ sending: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error });
      });
  };

  isValid = e => {
    if (e.target.name === 'link') {
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
      e.target.name === 'tags' ||
      e.target.name === 'cast' ||
      e.target.name === 'members' ||
      e.target.name === 'isIndependent'
    ) {
      return true;
    } else {
      if (
        e.target.value !== null &&
        e.target.value !== undefined &&
        e.target.value !== ''
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
    if (step === 4) {
      shouldVerifyEvents = currentStepState.shouldVerifyEvents.value;
    }

    return Object.keys(currentStepState)
      .map(key => {
        if (key === 'events' && !shouldVerifyEvents) {
          return true;
        }
        return currentStepState[key].isValid;
      })
      .reduce((accumulator, current) => {
        return current && accumulator;
      }, true);
  };

  closeModal = () => {
    this.setState(INITIAL_STATE);
    this.props.onChangeState();
  };

  nextStep = () => {
    const { step, steps } = this.state;
    if (this.canChangeStep()) {
      if (step === 3 && steps[2].isIndependent.value) {
        this.onSend();
        this.setState({ step: this.state.step + 2 });
      } else if (step === 4) {
        this.onSend();
        this.setState({ step: this.state.step + 1 });
      } else {
        this.setState({ step: this.state.step + 1 });
      }
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
    this.setState(INITIAL_STATE);
  };

  render() {
    const { steps, uploadingImage, errorOnImageFile } = this.state;

    if (!this.props.show) {
      return null;
    }

    return (
      <div>
        <div className="backgroundModal" onClick={this.closeModal} />
        <div className="modalUpload">
          <div className="labelModal">
            <Header>Enviar vídeo</Header>
            <img
              src={iconX}
              className="closeModal"
              alt="Botão para fechar modal"
              onClick={this.closeModal}
            />
          </div>
          {this.state.step <= 5 && (
            <div className="contentModal">
              {this.state.step < 5 && <StepBar step={this.state.step} />}
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
              {this.state.step === 3 && (
                <Step3 stepState={steps[2]} onChange={this.onChange} />
              )}
              {this.state.step === 4 && (
                <Step4 stepState={steps[3]} onChange={this.onChange} />
              )}
              {this.state.step === 5 && <Step5 resetSteps={this.resetSteps} />}
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
            {this.state.step === 4 && (
              <button className="button buttonPrimary" onClick={this.nextStep}>
                Concluir
              </button>
            )}
            {this.state.step === 5 && (
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

export default withAuthUser(withFirebase(Upload));
