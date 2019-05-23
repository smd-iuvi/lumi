import React, { Component } from 'react';
import Label from './Label/Label';

import './ProfileLabels.css';

class ProfileLabels extends Component {
  render() {
    return (
      <div className="ProfileLabels">
        <Label isEditing={false} type="E-mail" isPassword={false} />
        <Label isEditing={false} type="Senha" isPassword={true} />
      </div>
    );
  }
}

export default ProfileLabels;
