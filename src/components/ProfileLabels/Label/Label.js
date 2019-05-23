import React from 'react';

import './Label.css';

const Label = ({ editing, type, isPassword, value }) => {
  return (
    <div className="Label">
      <p>{type}</p>
      {editing ? <input /> : <p>{value}</p>}
    </div>
  );
};

export default Label;
