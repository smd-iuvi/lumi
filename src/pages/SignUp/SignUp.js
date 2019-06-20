import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid';
import './SignUp.css';
// import PropTypes from 'prop-types';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import { withAuthUser } from '../../Firebase/Session';

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
  error: null,
  seeBox: false
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.handleBox = this.handleBox.bind(this);
  }

  componentWillMount() {
    const { authUser, history } = this.props;

    if (authUser) {
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

  handleBox = () => {
    this.setState({ seeBox: true });
  }

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
      <>
        <div className="backgroundLogin">
          <span className="circle1" />
          <span className="circle2" />
          <span className="circle3" />
          <span className="circle4" />
        </div>
        <div className="Login">
          <form onSubmit={this.onSubmit} className="formLogin">
            <article className="titleLogin">
              <h1 className="Large-Text-Bold">Faça seu cadastro. É rápido.</h1>
            </article>
            <div className="contentForm">

              <article className="divTextInput">
                <h1 className="Medium-Text-Regular">nome</h1>
                <input
                  type="text"
                  value={name}
                  name="name"
                  onChange={this.onChange}
                  className="textInputAccount Medium-Text-Regular"
                  autoFocus
                />
              </article>
              {/* <input
                type="text"
                value={username}
                name="username"
                onChange={this.onChange}
                placeholder="username"
              />{' '}
              <br /> */}

              <article className="divTextInput">
                <h1 className="Medium-Text-Regular">e-mail</h1>
                <input
                  type="text"
                  value={email}
                  name="email"
                  onChange={this.onChange}
                  className="textInputAccount Medium-Text-Regular"
                />
              </article>

              <article className="divTextInput">
                <h1 className="Medium-Text-Regular">senha</h1>
                <input
                  type="password"
                  value={passwordOne}
                  name="passwordOne"
                  onChange={this.onChange}
                  className="textInputAccount Medium-Text-Regular"
                />
              </article>

              <article className="divTextInput">
                <h1 className="Medium-Text-Regular">confirme a senha</h1>
                <input
                  type="password"
                  value={passwordTwo}
                  name="passwordTwo"
                  onChange={this.onChange}
                  className="textInputAccount Medium-Text-Regular"
                />
              </article>

              {/* <input
                type="date"
                value={birthday}
                name="birthday"
                onChange={this.onChange}
                placeholder="Data de nascimento"
              />{' '}
              <input type="file" name="imageFile" onChange={this.onFileChange} />
              <br /> */}

              <div className="radiosRegister">
                <article>
                  <input type="radio" id="student" name="role" value={ROLES.STUDENT} onClick={this.handleBox} />
                  <label className="Medium-Text-Regular" for="student">Sou aluno(a) do SMD</label>
                </article>
                <article>
                  <input type="radio" id="teacher" name="role" value={ROLES.TEACHER} onClick={this.handleBox} />
                  <label className="Medium-Text-Regular" for="teacher">Sou professor(a) do SMD</label>
                </article>
              </div>

              {this.state.seeBox &&
                <div className="uploadDocument">
                  <article>
                    <h1 className="Medium-Text-Regular">Envie-nos uma declaração ou atestado de matrícula para confirmarmos o seu vínculo com o curso.</h1>
                  </article>
                  <input type="file" className="file" id="file" />
                  <label for="file" className="button buttonTerceary">
                    Escolher arquivo
                  </label>
                </div>
              }
              {/* <select onChange={this.onChange} name="role">
                <option select="selected" value={ROLES.USER}>
                  Usuário comum
            </option>
                <option value={ROLES.TEACHER}>Professor</option>
                <option value={ROLES.STUDENT}>Aluno</option>
              </select>{' '} */}
              <article className="buttonLogin">
                <button type="submit" className="button buttonPrimary">
                  Cadastrar
                </button>
              </article>

              <article className="notRegister">
                <h1 className="Small-Text-Regular">Já tem uma conta?</h1>
                <Link to={ROUTES.SIGN_IN} className="link">
                  <h1 className="Small-Text-Bold">Volte ao login</h1>
                </Link>
              </article>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default compose(
  withFirebase,
  withRouter,
  withAuthUser
)(SignUp);
