import React, { Component } from 'react';
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
import userPlaceholder from './assets/icons/user-placeholder.svg';

import { Link } from 'react-router-dom';
import { withAuthUser } from '../../Firebase/Session';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: true,
      showModal: false
    };
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal = () => {
    this.setState({ showModal: true });
  };

  onChangeState = () => {
    this.setState({ showModal: false });
  };

  onSignOut = () => {
    const { firebase, history } = this.props;
    firebase.doSignOut().then(() => {
      history.push(ROUTES.HOME);
    });
  };

  render() {
    const { authUser } = this.props;
    return (
      <div className="sidebar">
        <Upload
          show={this.state.showModal}
          onChangeState={this.onChangeState}
        />

        <Link to={ROUTES.HOME} className="link">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="iconsTop">
          <Link to={ROUTES.HOME} className="link">
            <ButtonsTop newClass="iconButtonsTop iconHome">Início</ButtonsTop>
          </Link>
          <Link to={ROUTES.HOME} className="link">
            <ButtonsTop newClass="iconButtonsTop iconExplore">
              Descobrir
            </ButtonsTop>
          </Link>
        </div>
        <article className="lineSidebar" />
        {authUser ? (
          <div className="optionsLogged">
            <div className="optionsProfile">
              <Link to={ROUTES.PROFILE} className="link">
                <ButtonProfile image={authUser.photo_url}>
                  {authUser.name}
                </ButtonProfile>
              </Link>
              <Link onClick={this.handleModal} className="showModal link">
                <ButtonsBottom
                  className="btnShow"
                  newClass="iconBottom iconNewVideo"
                >
                  Enviar vídeo
                </ButtonsBottom>
              </Link>
              <Link to={ROUTES.PROFILE} className="link">
                <ButtonsBottom newClass="iconBottom iconUser">
                  Meu perfil
                </ButtonsBottom>
              </Link>
              <Link to={ROUTES.PROFILE_MY_UPLOADS} className="link">
                <ButtonsBottom newClass="iconBottom iconMyVideos">
                  Meus envios
                </ButtonsBottom>
              </Link>
              <Link to={ROUTES.PROFILE_MY_LIST} className="link">
                <ButtonsBottom newClass="iconBottom iconList">
                  Minha lista
                </ButtonsBottom>
              </Link>
              {authUser.role === ROLES.TEACHER ? (
                <Link to={ROUTES.PROFILE_MY_EVENTS} className="link">
                  <ButtonsBottom newClass="iconBottom iconEvents">
                    Meus eventos
                  </ButtonsBottom>
                </Link>
              ) : null}
            </div>
            <Link to={ROUTES.PROFILE} className="link">
              <ButtonsBottom newClass="iconBottom iconHelp">
                Ajuda
              </ButtonsBottom>
            </Link>

            <ButtonsBottom
              newClass="iconBottom iconLogout"
              click={this.onSignOut}
            >
              Sair
            </ButtonsBottom>
          </div>
        ) : (
          <div className="divNotLogin">
            <Link to={ROUTES.SIGN_IN} className="link">
              <ButtonLogin image={userPlaceholder} />
            </Link>
            <Link to={ROUTES.PROFILE} className="link buttonHelp">
              <ButtonsBottom newClass="iconBottom iconHelp">
                Ajuda
              </ButtonsBottom>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default compose(
  withAuthUser,
  withFirebase,
  withRouter
)(Navbar);
