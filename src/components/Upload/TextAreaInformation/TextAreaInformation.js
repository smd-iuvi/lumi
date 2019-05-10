import React from 'react';

import './TextAreaInformation.css';

import Label from '../Label/Label';

const TextAreaInformation = ({ name, children, value, onChange }) => {
  return (
    <div className="TextAreaInformation infosContainer">
      <Label>{children}</Label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Digite algo..."
      />
    </div>
  );
};

export default TextAreaInformation;
