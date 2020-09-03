import React, { useState } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../../Firebase';

import './Sidebar.css';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import ButtonsTop from './ButtonsTop/ButtonsTop';
import ButtonProfile from './ButtonProfile/ButtonProfile';
import ButtonsBottom from './ButtonsBottom/ButtonsBottom';
import ButtonLogin from './ButtonLogin/ButtonLogin';
import Upload from '../Upload/Upload';

import logo from './assets/icons/lumi.svg';

import { Link } from 'react-router-dom';
import { withAuthUser } from '../../Firebase/Session';

function Navbar(props) {
  const [logged, setLogged] = useState(true);
  const [showModal, setShowModal] = useState(false);

  function handleModal() {
    setShowModal(true);
  };

  function onChangeState() {
    setShowModal(false);
  };

  function onSignOut() {
    const { firebase, history } = props;
    firebase.doSignOut().then(() => {
      history.push(ROUTES.HOME);
    });
  };

  const { authUser, location } = props;
  return (
    <div className="sidebar">
      <Upload
        show={showModal}
        onChangeState={onChangeState}
      />

      <Link to={ROUTES.HOME} className="link">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <div className="iconsTop">
        <Link to={ROUTES.HOME} className="link">
          <ButtonsTop
            newClass="iconButtonsTop iconHome"
            selected={location.pathname === ROUTES.HOME}
          >
            Início
          </ButtonsTop>
        </Link>
        <Link to={ROUTES.DISCOVER} className="link">
          <ButtonsTop
            newClass="iconButtonsTop iconExplore"
            selected={location.pathname === ROUTES.DISCOVER}
          >
            Descobrir
          </ButtonsTop>
        </Link>
      </div>
      <article className="lineSidebar" />
      {authUser ? (
        <div className="optionsLogged">
          <div className="optionsProfile">
            {authUser.role !== ROLES.USER ? (
              <Link onClick={handleModal} className="showModal link">
                <ButtonsBottom
                  className="btnShow"
                  newClass="iconBottom iconNewVideo"
                >
                  Enviar vídeo
                </ButtonsBottom>
              </Link>
            ) : null}
            <Link to={ROUTES.PROFILE} className="link">
              <ButtonsBottom
                newClass="iconBottom iconUser"
                selected={location.pathname === ROUTES.PROFILE}
              >
                Meu perfil
              </ButtonsBottom>
            </Link>
            <Link to={ROUTES.PROFILE_MY_UPLOADS} className="link">
              <ButtonsBottom
                newClass="iconBottom iconMyVideos"
                selected={location.pathname === ROUTES.PROFILE_MY_UPLOADS}
              >
                Meus envios
              </ButtonsBottom>
            </Link>
            <Link to={ROUTES.PROFILE_MY_LIST} className="link">
              <ButtonsBottom
                newClass="iconBottom iconList"
                selected={location.pathname === ROUTES.PROFILE_MY_LIST}
              >
                Minha lista
              </ButtonsBottom>
            </Link>
            {authUser.role === ROLES.TEACHER ? (
              <Link to={ROUTES.PROFILE_MY_EVENTS} className="link">
                <ButtonsBottom
                  newClass="iconBottom iconEvents"
                  selected={location.pathname === ROUTES.PROFILE_MY_EVENTS}
                >
                  Meus eventos
                </ButtonsBottom>
              </Link>
            ) : null}
          </div>
          {/* <Link to={ROUTES.PROFILE} className="link"> */}
          <ButtonsBottom newClass="iconBottom iconHelp">Ajuda</ButtonsBottom>
          {/* </Link> */}

          <ButtonsBottom
            newClass="iconBottom iconLogout"
            click={onSignOut}
          >
            Sair
          </ButtonsBottom>
        </div>
      ) : (
          <div className="divNotLogin">
            <Link to={ROUTES.SIGN_IN} className="link">
              <ButtonLogin />
            </Link>
            <Link className="link buttonHelp">
              <ButtonsBottom newClass="iconBottom iconHelp">
                Ajuda
            </ButtonsBottom>
            </Link>
          </div>
        )}
    </div>
  );
}

export default compose(
  withAuthUser,
  withFirebase,
  withRouter
)(Navbar);
