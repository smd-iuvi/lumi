import React from 'react';

import './TextFieldInformation.css';

const TextFieldInformation = ({ name, label, onChange, value, placeholder }) => {
  return (
    <div className="TextFieldInformation infosContainer">
      <input
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="Medium-Text-Regular"
      />
    </div>
  );
};

export default TextFieldInformation;
