import React, { useState } from 'react';
import './NewEvent.css';

import { INITIAL_STATE } from './InitialState';

import { withServiceManager } from '../../services';
import { withAuthUser } from '../../services/Session';

import Header from '../Header/Header';
import StepBar from './StepBar/StepBar';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';

import iconX from './assets/x.svg';

function NewEvent(props) {
  const [uploadingImage, setUploadingImage] = useState(INITIAL_STATE.uploadingImage);
  const [fileToUpload, setFileToUpload] = useState(INITIAL_STATE.fileToUpload);
  const [errorOnImageFile, setErrorOnImageFile] = useState(INITIAL_STATE.errorOnImageFile);
  const [sending, setSending] = useState(INITIAL_STATE.sending);
  const [error, setError] = useState(INITIAL_STATE.error);
  const [step, setStep] = useState(INITIAL_STATE.step);
  const [steps, setSteps] = useState(INITIAL_STATE.steps);

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
    const { serviceManager } = props;
    serviceManager
      .upload(image, 'event', snapshot => console.log(snapshot))
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

  function onChange(e) {
    const currentStepState = steps[step - 1];
    const newCurrentStepState = {
      ...currentStepState,
      [e.target.name]: {
        value: e.target.value,
        isValid: isValid(e)
      }
    };
    const newSteps = [...steps];
    newSteps[step - 1] = newCurrentStepState;
    setSteps(newSteps);
  };

  function isValid(e) {
    if (
      e.target.value !== null &&
      e.target.value !== undefined &&
      e.target.value !== ''
    ) {
      return true;
    }
    return false;
  };

  function canChangeStep() {
    const currentStepState = steps[step - 1];

    return Object.keys(currentStepState)
      .map(key => {
        return currentStepState[key].isValid;
      })
      .reduce((accumulator, current) => {
        return current && accumulator;
      }, true);
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

  function onSend() {
    const { serviceManager, authUser } = props;

    setSending(true);

    const event = {
      name: steps[0].name.value,
      imageUrl: steps[0].imageUrl.value,
      discipline: steps[0].discipline.value,
      semester: steps[0].semester.value,
      description: steps[0].description.value,
      date: steps[1].date.value.toDateString(),
      sortableDate: steps[1].date.value.getTime(),
      createdBy: authUser.uid
    };

    serviceManager.event
      .create(event)
      .then(() => {
        console.log('Criado');
        setSending(false);
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });
  };

  function closeModal() {
    setUploadingImage(INITIAL_STATE.uploadingImage);
    setFileToUpload(INITIAL_STATE.fileToUpload);
    setErrorOnImageFile(INITIAL_STATE.errorOnImageFile);
    setSending(INITIAL_STATE.sending);
    setError(INITIAL_STATE.error);
    setStep(INITIAL_STATE.step);
    setSteps(INITIAL_STATE.steps);
    props.onChangeState();
  };

  function nextStep() {
    if (canChangeStep()) {
      if (step === 2) {
        onSend();
      }
      setStep(step + 1);
    } else {
      highlightInvalidFields();
    }
  };

  function returnStep() {
    setStep(step - 1);
  };

  function resetSteps() {
    setUploadingImage(INITIAL_STATE.uploadingImage);
    setFileToUpload(INITIAL_STATE.fileToUpload);
    setErrorOnImageFile(INITIAL_STATE.errorOnImageFile);
    setSending(INITIAL_STATE.sending);
    setError(INITIAL_STATE.error);
    setStep(INITIAL_STATE.step);
    setSteps(INITIAL_STATE.steps);
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="NewEvent">
      <div className="backgroundModal" onClick={closeModal} />
      <div className="modalUpload">
        <div className="labelModal">
          <Header>Criar evento</Header>
          <img
            src={iconX}
            className="closeModal"
            alt="Botão para fechar modal"
            onClick={closeModal}
          />
        </div>
        {step <= 3 && (
          <div className="contentModal">
            {step < 3 && <StepBar step={step} />}
            {step === 1 && (
              <Step1
                stepState={steps[0]}
                onChange={(e) => onChange(e)}
                onFileChange={onFileChange}
                error={errorOnImageFile}
                uploading={uploadingImage}
              />
            )}
            {step === 2 && (
              <Step2 stepState={steps[1]} onChange={(e) => onChange(e)} />
            )}
            {step === 3 && <Step3 resetSteps={resetSteps} />}
          </div>
        )}
        <div className="handleSteps">
          {step === 2 && (
            <button
              className="button buttonSecundary"
              onClick={returnStep}
            >
              Anterior
            </button>
          )}
          {step === 1 && (
            <button className="button buttonPrimary" onClick={nextStep}>
              Próximo
            </button>
          )}
          {step === 2 && (
            <button className="button buttonPrimary" onClick={nextStep}>
              Concluir
            </button>
          )}
          {step === 3 && (
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

export default withAuthUser(withServiceManager(NewEvent));
