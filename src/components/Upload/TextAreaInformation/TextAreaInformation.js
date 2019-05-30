import React from 'react';

import './TextAreaInformation.css';

const TextAreaInformation = ({ name, children, value, onChange, placeholder }) => {
  return (
    <div className="TextAreaInformation infosContainer">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="Medium-Text-Regular"
      />
    </div>
  );
};

export default TextAreaInformation;
