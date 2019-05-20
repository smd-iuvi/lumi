import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid';
// import PropTypes from 'prop-types';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import { withFirebase } from '../../Firebase';
import { withAuthUser } from '../../Firebase/Session';

const style = {
  color: '#fff'
};

const INITIAL_STATE = {
  name: '',
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  role: ROLES.USER,
  birthday: '2010-01-01',
  imageFile: null,
  imageUrl: '',
  uploading: false,
  error: null
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentWillMount() {
    const { authUser, history } = this.props;

    if (authUser !== null) {
      history.push(ROUTES.HOME);
    }
  }

  onSubmit = async event => {
    event.preventDefault();
    const { firebase, history } = this.props;

    this.onUploadImage(url => {
      const user = {
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.passwordOne,
        role: this.state.role,
        birthday: this.state.birthday,
        photo_url: url
      };

      firebase.user.create(user, (user, error) => {
        history.push(ROUTES.HOME);
      });
    });
  };

  onChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  onFileChange = event => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState({ imageFile: image });
    }
  };

  onUploadImage = async callback => {
    const { firebase } = this.props;
    const { imageFile } = this.state;
    this.setState({ uploading: true });
    const imageName = uuid();

    await firebase.storage
      .ref(`profile_photo/${imageName}`)
      .put(imageFile)
      .on(
        'state_changed',
        snapshot => {
          console.log(snapshot);
        },
        error => {
          this.setState({ error: error });
        },
        completion => {
          this.setState({ uploading: false });
          console.log('Finished');
          firebase.storage
            .ref('profile_photo')
            .child(imageName)
            .getDownloadURL()
            .then(url => {
              callback(url);
            })
            .catch(error => {
              this.setState({ error: error });
            });
        }
      );
  };

  render() {
    const {
      name,
      username,
      email,
      passwordOne,
      passwordTwo,
      birthday,
      imageFile
    } = this.state;
    return (
      <div className="container" style={style}>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={name}
            name="name"
            onChange={this.onChange}
            placeholder="Nome"
          />{' '}
          <br />
          <input
            type="text"
            value={username}
            name="username"
            onChange={this.onChange}
            placeholder="username"
          />{' '}
          <br />
          <input
            type="text"
            value={email}
            name="email"
            onChange={this.onChange}
            placeholder="Email"
          />{' '}
          <br />
          <input
            type="password"
            value={passwordOne}
            name="passwordOne"
            onChange={this.onChange}
            placeholder="Senha"
          />{' '}
          <br />
          <input
            type="password"
            value={passwordTwo}
            name="passwordTwo"
            onChange={this.onChange}
            placeholder="Confirmar senha"
          />{' '}
          <br />
          <input
            type="date"
            value={birthday}
            name="birthday"
            onChange={this.onChange}
            placeholder="Data de nascimento"
          />{' '}
          <input type="file" name="imageFile" onChange={this.onFileChange} />
          <br />
          <select style={style} onChange={this.onChange} name="role">
            <option select="selected" value={ROLES.USER}>
              Usuário comum
            </option>
            <option value={ROLES.TEACHER}>Professor</option>
            <option value={ROLES.STUDENT}>Aluno</option>
          </select>{' '}
          <br />
          <button type="submit" style={style}>
            Enviar
          </button>
        </form>
      </div>
    );
  }
}

export default compose(
  withFirebase,
  withRouter,
  withAuthUser
)(SignUp);
