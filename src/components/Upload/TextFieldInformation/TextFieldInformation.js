import React from 'react';

import './TextFieldInformation.css';

const TextFieldInformation = ({
  name,
  label,
  onChange,
  value,
  isValid,
  placeholder
}) => {
  let classes = '';
  if (isValid || isValid == null) {
    classes = 'TextFieldInformation infosContainer';
  } else {
    classes = 'TextFieldInformation infosContainer invalid';
  }
  return (
    <div className={classes}>
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
