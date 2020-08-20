import React, { Component } from 'react';
import Label from './Label/Label';
import SecondaryButton from '../Buttons/SecondaryButton/SecondaryButton';

import './ProfileLabels.css';

function ProfileLabels(props) {
  return (
    <div className="ProfileLabels">
      <div className="LabelsContainer">
        <Label isEditing={false} type="E-mail" isPassword={false} />
        <Label isEditing={false} type="Senha" isPassword={true} />
      </div>
      <SecondaryButton>Salvar modificações</SecondaryButton>
    </div>
  );
}

export default ProfileLabels;
