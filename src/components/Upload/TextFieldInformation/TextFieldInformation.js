import React from 'react';

import './TextFieldInformation.css';

import Label from '../Label/Label';

const TextFieldInformation = ({ name, label, onChange, value }) => {
  return (
    <div className="TextFieldInformation infosContainer">
      <Label>{label}</Label>
      <input
        name={name}
        type="text"
        placeholder="Digite algo..."
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextFieldInformation;
