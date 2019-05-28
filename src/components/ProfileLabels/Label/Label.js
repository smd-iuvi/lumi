import React from 'react';

import './Label.css';
import SecondaryButton from '../../Buttons/SecondaryButton/SecondaryButton';

const Label = ({
  isEditing,
  type,
  isPassword,
  value,
  onStateChange,
  onEdit
}) => {
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
        {isEditing ? (
          <input value={value} type="password" onChange={onEdit} />
        ) : (
          <p />
        )}
        <SecondaryButton onClick={onStateChange}>
          {isEditing ? 'Cancelar' : 'Mudar Senha'}
        </SecondaryButton>
      </div>
    );
  } else {
    label = <p>{value}</p>;
  }
  return (
    <div className="Label">
      <p>{type}</p>
      {label}
    </div>
  );
};

export default Label;
