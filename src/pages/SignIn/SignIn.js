import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import './SignIn.css';
import { withAuthUser } from '../../Firebase/Session';


function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      const { authUser, history } = props;

      if (authUser)
        history.push(ROUTES.HOME);
    }
  }, []);

  function onSubmit(event) {
    const { firebase, history } = props;
    event.preventDefault();

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail(email);
        setPassword(password);
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        setError(error);
      });
  };

  let message = null;
  if (error) {
    message = error.code;
    if (message === 'auth/invalid-email') message = 'E-mail inválido';
    else if (message === 'auth/wrong-password') message = 'Senha incorreta';
    else if (message === 'auth/user-not-found')
      message = 'Usuário não cadastrado';
    else message = 'Ocorreu algum erro no login';
  }

  return (
    <>
      <div className="Login">
        <form onSubmit={onSubmit} className="formLogin">
          <article className="titleLogin">
            <h1 className="Large-Text-Bold">Olá! Bem-vindo(a) de volta.</h1>
          </article>
          <div className="contentForm">
            <h1 className="Large-Text-Bold subtitleLogin">Faça seu login</h1>
            {error && (
              <h1 className="Small-Text-Regular errorLogin">{message}</h1>
            )}

            <article className="divTextInput">
              <h1 className="Medium-Text-Regular">e-mail</h1>
              <input
                type="text"
                value={email}
                name="email"
                onChange={e => setEmail(e.target.value)}
                className="textInputAccount Medium-Text-Regular"
                autoFocus
              />
            </article>

            <article className="divTextInput">
              <h1 className="Medium-Text-Regular">senha</h1>
              <input
                type="password"
                value={password}
                name="password"
                onChange={e => setPassword(e.target.value)}
                className="textInputAccount Medium-Text-Regular"
              />
            </article>

            <h1 className="Small-Text-Bold forgotPassword">
              Esqueceu sua senha?
            </h1>
            <article className="buttonLogin">
              <button type="submit" className="button buttonPrimary">
                Entrar
              </button>
            </article>

            <article className="notRegister">
              <h1 className="Small-Text-Regular">Ainda não tem uma conta?</h1>
              <Link to={ROUTES.SIGN_UP} className="link">
                <h1 className="Small-Text-Bold">Faça seu cadastro</h1>
              </Link>
            </article>
          </div>
        </form>
      </div>
    </>
  );
}

export default compose(
  withRouter,
  withFirebase,
  withAuthUser
)(SignIn);
