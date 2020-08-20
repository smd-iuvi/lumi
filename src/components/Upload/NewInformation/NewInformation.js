import React, { useState } from 'react';

import './NewInformation.css';

import iconX from './assets/x.svg';

function NewInformation(props) {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([
    'Direção',
    'Edição',
    'Trilha Sonora',
    'Roteiro',
    'Filmagem',
    'Fotografia'
  ]);

  const { member, onChange, remove } = props;
  return (
    <div className="NewInformation">
      <div>
        <img src={iconX} className="closeInfo" onClick={remove} />
      </div>
      <div>
        <select
          name="role"
          value={member.role}
          onChange={onChange}
          className="Medium-Text-Regular"
        >
          {options.map(op => (
            <option value={op}>{op}</option>
          ))}
        </select>
        <br />
        <input
          type="text"
          placeholder="Nome do participante"
          name="name"
          value={member.name}
          onChange={onChange}
          className="Medium-Text-Regular"
        />
      </div>
    </div>
  );
}

export default NewInformation;
