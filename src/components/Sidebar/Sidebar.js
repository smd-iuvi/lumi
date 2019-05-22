import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../../Firebase';

import './Sidebar.css';

import * as ROUTES from '../../constants/routes';
import ButtonsTop from './ButtonsTop/ButtonsTop';
import ButtonProfile from './ButtonProfile/ButtonProfile';
import ButtonsBottom from './ButtonsBottom/ButtonsBottom';
import Upload from '../Upload/Upload';

import logo from './assets/icons/lumi.svg';
import home from './assets/icons/home.svg';
import explore from './assets/icons/explore.svg';
import profile from './assets/profile.jpg';
import newVideo from './assets/icons/upload.svg';
import myVideos from './assets/icons/my_videos.svg';
import user from './assets/icons/user.svg';
import myList from './assets/icons/bookmark.svg';
import help from './assets/icons/help.svg';
import logout from './assets/icons/logout.svg';
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

    console.log('Saind..');

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
            <ButtonsTop icon={home}>Início</ButtonsTop>
          </Link>
          <Link to={ROUTES.HOME} className="link">
            <ButtonsTop icon={explore}>Descobrir</ButtonsTop>
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
              <article onClick={this.handleModal}>
                <ButtonsBottom icon={newVideo}>Enviar vídeo</ButtonsBottom>
              </article>
              <Link to={ROUTES.PROFILE} className="link">
                <ButtonsBottom icon={user}>Meu perfil</ButtonsBottom>
              </Link>
              <Link to={ROUTES.PROFILE} className="link">
                <ButtonsBottom icon={myVideos}>Meus envios</ButtonsBottom>
              </Link>
              <Link to={ROUTES.PROFILE} className="link">
                <ButtonsBottom icon={myList}>Minha lista</ButtonsBottom>
              </Link>
            </div>
            <Link to={ROUTES.PROFILE} className="link">
              <ButtonsBottom icon={help}>Ajuda</ButtonsBottom>
            </Link><Link to={ROUTES.PROFILE} className="link">
              <ButtonsBottom icon={logout}>Sair</ButtonsBottom>
            </Link>
            <ButtonsBottom icon={home} click={this.onSignOut}>
              Sair
            </ButtonsBottom>
          </div>
        ) : (
            <Link to={ROUTES.SIGN_IN} className="link">
              <button className="buttonsNavbar">
                <i className="far fa-user icon" />
                <h1 className="labelButtons">ENTRAR</h1>
              </button>
            </Link>
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
