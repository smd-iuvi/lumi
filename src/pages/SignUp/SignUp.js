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
  email: '',
  passwordOne: '',
  passwordTwo: '',
  role: ROLES.USER,
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

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.passwordOne,
      role: this.state.role
    };

    firebase.user.create(user, (user, error) => {
      history.push(ROUTES.HOME);
    });
  };

  onChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleBox = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ seeBox: true });
  };

  render() {
    const { name, email, passwordOne, passwordTwo } = this.state;
    return (
      <>
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

              <div className="radiosRegister">
                <article className="radioOption">
                  <input
                    type="radio"
                    id="student"
                    name="role"
                    value={ROLES.USER}
                    onClick={this.handleBox}
                  />
                  <label for="student" className="checkbox">
                    <article className="border">
                      <article />
                    </article>
                  </label>
                  <label className="Medium-Text-Regular" for="student">
                    Sou aluno(a) do SMD
                  </label>
                </article>
                <article className="radioOption">
                  <input
                    type="radio"
                    id="teacher"
                    name="role"
                    value={ROLES.TEACHER}
                    onClick={this.handleBox}
                  />
                  <label for="student" className="checkbox">
                    <article className="border">
                      <article />
                    </article>
                  </label>
                  <label className="Medium-Text-Regular" for="teacher">
                    Sou professor(a) do SMD
                  </label>
                </article>
              </div>

              {this.state.seeBox && (
                <div className="uploadDocument">
                  <article>
                    <h1 className="Medium-Text-Regular">
                      Envie-nos uma declaração ou atestado de matrícula para
                      confirmarmos o seu vínculo com o curso.
                    </h1>
                  </article>
                  <input type="file" className="file" id="file" />
                  <label for="file" className="button buttonTerceary">
                    Escolher arquivo
                  </label>
                </div>
              )}

              <article className="buttonLogin" onClick={this.onSubmit}>
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
