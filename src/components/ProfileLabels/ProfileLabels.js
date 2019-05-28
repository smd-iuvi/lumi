import React, { Component } from 'react';
import Label from './Label/Label';
import SecondaryButton from '../Buttons/SecondaryButton/SecondaryButton';

import { withFirebase } from '../../Firebase';

import './ProfileLabels.css';
import { Thumbs } from 'react-responsive-carousel';

class ProfileLabels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditingPassword: false,
      newPassword: null,
      isNewPasswordValid: false
    };
  }

  onStateChange = () => {
    const { isEditingPassword } = this.state;
    this.setState({ isEditingPassword: !isEditingPassword });

    if (isEditingPassword) {
      this.setState({ newPassword: null });
    }
  };

  onEdit = e => {
    this.setState({ newPassword: e.target.value });

    if (e.target.value.length >= 6) {
      this.setState({ isNewPasswordValid: true });
    }
  };

  onSave = () => {
    const { firebase } = this.props;
    const { newPassword } = this.state;

    firebase
      .doPasswordUpdate(newPassword)
      .then(a => {
        console.log(a);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { isEditingPassword, newPassword, isNewPasswordValid } = this.state;
    console.log(isNewPasswordValid);
    return (
      <div className="ProfileLabels">
        <div className="LabelsContainer">
          <Label isEditing={false} type="E-mail" isPassword={false} />
          <Label
            isEditing={isEditingPassword}
            type="Senha"
            isPassword={true}
            value={newPassword}
            onStateChange={this.onStateChange}
            onEdit={this.onEdit}
          />
        </div>
        <SecondaryButton
          enabled={isNewPasswordValid && isEditingPassword}
          onClick={this.onSave}
        >
          Salvar modificações
        </SecondaryButton>
      </div>
    );
  }
}

export default withFirebase(ProfileLabels);
