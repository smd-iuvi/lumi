import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import './SignUp.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

import { withServiceManager } from '../../services';
import { withAuthUser } from '../../services/Session';

function SignUp(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [file, setFile] = useState(null)
  const [role, setRole] = useState(ROLES.USER);
  const [seeBox, setSeeBox] = useState(false);

  useEffect(() => {
    return () => {
      const { authUser, history } = props;

      if (authUser)
        history.push(ROUTES.HOME);
    }
  }, []);

  const errorNotify = (message) => toast.error(message)
  const sucessNotify = (message) => toast.success(message);


  async function onSubmit(event) {
    event.preventDefault();
    const { serviceManager, history } = props;

    const user = {
      name: name,
      email: email,
      password: passwordOne,
      role: role
    };

    if (validFile(role, file)) {
      serviceManager.user.create(user, (user, error) => {
        if (error !== null) {
          if (error.code === "auth/email-already-in-use") {
            errorNotify("Email já em uso")
          } else {
            errorNotify("Ocorreu um erro. Tente novamente.")
          }
        } else {
          sucessNotify("Conta criada com sucesso!")
          history.push(ROUTES.HOME);
        }
      });
    }

  };

  function onFileChange(event) {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file)
    }
  };

  function handleBox(event) {
    setRole(event.target.value);
    setSeeBox(true);
  };

  function validateFields() {
    return validatePassword(passwordOne, passwordTwo) && validateEmail(email) && name !== ""
  }

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase());
  }

  function validatePassword(passwordOne, passwordTwo) {
    return passwordOne.length >= 8 && passwordOne === passwordTwo
  }

  function validFile(role, file) {
    if (role === ROLES.STUDENT || role === ROLES.TEACHER) {
      if (file == null) {
        errorNotify("Escolha um arquivo de comprovante")
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  }

  return (
    <>
      <div className="Login">
        <form onSubmit={onSubmit} className="formLogin">
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
                onChange={e => setName(e.target.value)}
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
                onChange={e => setEmail(e.target.value)}
                className="textInputAccount Medium-Text-Regular"
              />
            </article>

            <article className="divTextInput">
              <h1 className="Medium-Text-Regular">senha</h1>
              <input
                type="password"
                value={passwordOne}
                name="passwordOne"
                onChange={e => setPasswordOne(e.target.value)}
                className="textInputAccount Medium-Text-Regular"
              />
            </article>

            <article className="divTextInput">
              <h1 className="Medium-Text-Regular">confirme a senha</h1>
              <input
                type="password"
                value={passwordTwo}
                name="passwordTwo"
                onChange={e => setPasswordTwo(e.target.value)}
                className="textInputAccount Medium-Text-Regular"
              />
            </article>

            <div className="radiosRegister">
              <article className="radioOption">
                <input
                  type="radio"
                  id="student"
                  name="role"
                  value={ROLES.STUDENT}
                  onClick={handleBox}
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
                  onClick={handleBox}
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

            {seeBox && (
              <div className="uploadDocument">
                <article>
                  <h1 className="Medium-Text-Regular">
                    Envie-nos uma declaração ou atestado de matrícula para
                    confirmarmos o seu vínculo com o curso.
                  </h1>
                </article>
                <input type="file" className="file" id="file" onChange={onFileChange} accept="image/*,.pdf" />
                <label for="file" className="button buttonTerceary">
                  Escolher arquivo
                </label>
              </div>
            )}

            <article className="buttonLogin" onClick={onSubmit}>
              {validateFields() ?
                <button type="submit" className="button buttonPrimary">
                  Cadastrar
                </button>
                :
                <button type="submit" className="button buttonPrimary" disabled>
                  Cadastrar
                </button>
              }
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

export default compose(
  withServiceManager,
  withRouter,
  withAuthUser
)(SignUp);
