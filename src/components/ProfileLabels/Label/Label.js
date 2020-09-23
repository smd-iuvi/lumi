import React from 'react';

import './Label.css';
import SecondaryButton from '../../Buttons/SecondaryButton/SecondaryButton';

const Label = ({ editing, type, isPassword, value }) => {
  var label = null;

  const style = {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    alignItens: 'center',
    justifyItens: 'center',
    marginTop: '16px',
    marginRight: '16px',
    marginBottom: '16px'
  };

  if (isPassword) {
    label = (
      <div style={style}>
        <p className="Medium-Text-Regular">{value}</p>
        <SecondaryButton>Mudar Senha</SecondaryButton>
      </div>
    );
  } else {
    label = <p className="Medium-Text-Regular">{value}</p>;
  }
  return (
    <div className="Label">
      <h5 className="Medium-Text-Regular">{type}</h5>
      {label}
    </div>
  );
};

export default Label;
