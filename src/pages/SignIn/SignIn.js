import React, { useState, useEffect, useReducer } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { withServiceManager } from '../../services';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import './SignIn.css';
import { withAuthUser } from '../../services/Session';


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
    const { serviceManager, history } = props;
    event.preventDefault();

    serviceManager
      .user
      .signIn(email, password)
      .then(() => {
        setEmail(email);
        setPassword(password);
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        setError(error);
      });
  };

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase());
  }

  function validatePassword(password) {
    return password.length >= 8
  }

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
              {validateEmail(email) && validatePassword(password) ?
                <button type="submit" className="button buttonPrimary">
                  Entrar
               </button>
                :
                <button type="submit" className="button buttonPrimary" disabled>
                  Entrar
               </button>
              }
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
  withServiceManager,
  withAuthUser
)(SignIn);
