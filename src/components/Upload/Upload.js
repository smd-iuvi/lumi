import React, { useState } from 'react';

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

function Upload(props) {
  const [step, setStep] = useState(INITIAL_STATE.step);
  const [uploadingImage, setUploadingImage] = useState(INITIAL_STATE.uploadingImage);
  const [fileToUpload, setFileToUpload] = useState(INITIAL_STATE.fileToUpload);
  const [errorOnImageFile, setErrorOnImageFile] = useState(INITIAL_STATE.errorOnImageFile);
  const [sending, setSending] = useState(INITIAL_STATE.sending);
  const [error, setError] = useState(INITIAL_STATE.error);
  const [steps, setSteps] = useState(INITIAL_STATE.steps);

  function onChange(e) {
    const currentStepState = steps[step - 1];
    const newCurrentStepState = {
      ...currentStepState,
      [e.target.name]: {
        value:
          e.target.name === 'shouldVerifyEvents'
            ? e.target.checked
            : e.target.value,
        isValid: isValid(e)
      }
    };
    const newSteps = [...steps];
    newSteps[step - 1] = newCurrentStepState;
    console.log(newCurrentStepState)
    setSteps(newSteps);
  };

  function onFileChange(event) {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      if (image.type.includes('image')) {
        setFileToUpload(image);
        setUploadingImage(true);
        setErrorOnImageFile(null);
        onUpload(image);
      } else {
        setErrorOnImageFile({
          message: 'Arquivo inválido. Escolha uma imagem'
        });
      }
    }
  };

  function onUpload(image) {
    const { firebase } = props;
    firebase
      .upload(image, 'thumbnail', snapshot => console.log(snapshot))
      .then(url => {
        const currentStepState = steps[step - 1];
        const newCurrentStepState = {
          ...currentStepState,
          imageUrl: { value: url, isValid: true }
        };
        const newSteps = [...steps];
        newSteps[step - 1] = newCurrentStepState;

        setSteps(newSteps);
      })
      .catch(error => console.log(error));
  };

  function cleanMembersUUIDKeys(members) {
    return members.map(member => {
      return { role: member.role, name: member.name };
    });
  };

  function onSend() {
    const { firebase, authUser } = props;

    setSending(true);

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
      members: cleanMembersUUIDKeys(steps[1].members.value),
      isIndependent: steps[2].isIndependent.value,
      discipline: steps[3].discipline.value,
      semester: steps[3].semester.value,
      professor: steps[3].professor.value,
      about: steps[3].about.value,
      event: steps[3].events.value,
      createdBy: authUser.uid,
      views: 0,
      claps: 0
    };

    firebase.video
      .create(video)
      .then(() => {
        console.log('Criado');
        setSending(false);
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });
  };

  function isValid(e) {
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

  function canChangeStep() {
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

  function closeModal() {
    resetSteps();
    props.onChangeState();
  };

  function nextStep() {
    if (canChangeStep()) {
      if (step === 3 && steps[2].isIndependent.value) {
        onSend();
        setStep(step + 2);
      } else if (step === 4) {
        onSend();
        setStep(step + 1);
      } else {
        setStep(step + 1);
      }
    } else {
      highlightInvalidFields();
    }
  };

  function highlightInvalidFields() {
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
    setSteps(newSteps);
  };

  function returnStep() {
    setStep(step - 1);
  };

  function resetSteps() {
    setStep(INITIAL_STATE.step);
    setUploadingImage(INITIAL_STATE.uploadingImage);
    setFileToUpload(INITIAL_STATE.fileToUpload);
    setErrorOnImageFile(INITIAL_STATE.errorOnImageFile);
    setSending(INITIAL_STATE.sending);
    setError(INITIAL_STATE.error);
    setSteps(INITIAL_STATE.steps);
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="Upload">
      <div className="backgroundModal" onClick={closeModal} />
      <div className="modalUpload">
        <div className="labelModal">
          <Header>Enviar vídeo</Header>
          <img
            src={iconX}
            className="closeModal"
            alt="Botão para fechar modal"
            onClick={closeModal}
          />
        </div>
        {step <= 5 && (
          <div className="contentModal">
            {step < 5 && <StepBar step={step} />}
            {step === 1 && (
              <Step1
                stepState={steps[0]}
                onChange={onChange}
                onFileChange={onFileChange}
                error={errorOnImageFile}
                uploading={uploadingImage}
              />
            )}
            {step === 2 && (
              <Step2 stepState={steps[1]} onChange={onChange} />
            )}
            {step === 3 && (
              <Step3 stepState={steps[2]} onChange={onChange} />
            )}
            {step === 4 && (
              <Step4 stepState={steps[3]} onChange={onChange} />
            )}
            {step === 5 && <Step5 resetSteps={resetSteps} />}
          </div>
        )}
        <div className="handleSteps">
          {step > 1 && step < 5 && (
            <button
              className="button buttonSecundary"
              onClick={returnStep}
            >
              Anterior
            </button>
          )}
          {step < 4 && (
            <button className="button buttonPrimary" onClick={nextStep}>
              Próximo
            </button>
          )}
          {step === 4 && (
            <button className="button buttonPrimary" onClick={nextStep}>
              Concluir
            </button>
          )}
          {step === 5 && (
            <button
              className="button buttonPrimary"
              onClick={closeModal}
            >
              Ok
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuthUser(withFirebase(Upload));
