import React from 'react';

import './TextAreaInformation.css';

const TextAreaInformation = ({
  name,
  children,
  value,
  isValid,
  onChange,
  placeholder
}) => {
  let classes = '';
  if (isValid || isValid == null) {
    classes = 'TextAreaInformation infosContainer';
  } else {
    classes = 'TextAreaInformation infosContainer invalid';
  }
  return (
    <div className={classes}>
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
