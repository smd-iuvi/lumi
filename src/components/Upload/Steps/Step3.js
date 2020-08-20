import React from 'react';

import './Steps.css';

import bone from './assets/bone.svg';
import chap from './assets/chap-formatura.svg';

function Step3(props) {
  function onClick(value) {
    const { stepState, onChange } = props;
    const newIsIndependent = { ...stepState.isIndependent };

    const event = {
      target: {
        name: 'isIndependent',
        value: value
      }
    };

    onChange(event);
  };

  const { stepState } = props;
  let independentClasses = 'optionLeft';
  let notIndependenteClasses = '';

  if (stepState.isIndependent.value == true) {
    independentClasses = 'optionLeft selected';
  } else if (stepState.isIndependent.value == false) {
    notIndependenteClasses = 'selected';
  }

  return (
    <div className="Steps">
      <h1 className="Large-Text-Medium">Tipo do vídeo</h1>
      <article className="line" />
      <h1 className="subtitleStep Small-Text-Regular">
        Escolha uma das opções.
      </h1>
      <div className="optionsStep">
        <div
          className={independentClasses}
          onClick={() => onClick(true)}
        >
          <img src={bone} />
          <h1 className="Medium-Text-Medium">Trabalho independente</h1>
          <h1 className="subtitleStep Small-Text-Regular">
            Fiz esse video por conta própria
          </h1>
        </div>
        <div
          onClick={() => onClick(false)}
          className={notIndependenteClasses}
        >
          <img src={chap} />
          <h1 className="Medium-Text-Medium">Trabalho de disciplina</h1>
          <h1 className="subtitleStep Small-Text-Regular">
            Fiz esse video para uma disciplina
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Step3;
