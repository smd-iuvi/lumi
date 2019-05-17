import React, { Component } from 'react';

import './Sidebar.css';

import * as ROUTES from '../../constants/routes';
import ButtonsTop from './ButtonsTop/ButtonsTop';
import ButtonProfile from './ButtonProfile/ButtonProfile';
import ButtonsBottom from './ButtonsBottom/ButtonsBottom';

import logo from './assets/icons/lumi.svg';
import home from './assets/icons/home.svg';
import explore from './assets/icons/explore_button.svg';
import upload from './assets/icons/new_video.svg';
import list from './assets/icons/list_button.svg';
import profile from './assets/profile.jpg';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  state = {
    logged: true
  };

  render() {
    return (
      <div className="sidebar">
        <Link to={ROUTES.HOME}>
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="iconsTop">
          <Link to={ROUTES.HOME}>
            <ButtonsTop icon={home}>Início</ButtonsTop>
          </Link>
          <Link to={ROUTES.HOME}>
            <ButtonsTop icon={explore}>Descobrir</ButtonsTop>
          </Link>
        </div>
        <article className="lineSidebar"></article>
        {this.state.logged ? (
          <div className="optionsLogged">
            <div className="optionsProfile">
              <Link to={ROUTES.PROFILE}>
                <ButtonProfile image={profile}>Clarissa Ester</ButtonProfile>
              </Link>
              <Link to={ROUTES.PROFILE}>
                <ButtonsBottom icon={home}>Enviar vídeo</ButtonsBottom>
              </Link>
              <Link to={ROUTES.PROFILE}>
                <ButtonsBottom icon={home}>Meu perfil</ButtonsBottom>
              </Link>
              <Link to={ROUTES.PROFILE}>
                <ButtonsBottom icon={home}>Meus envios</ButtonsBottom>
              </Link>
              <Link to={ROUTES.PROFILE}>
                <ButtonsBottom icon={home}>Minha lista</ButtonsBottom>
              </Link>
            </div>
            <Link to={ROUTES.PROFILE}>
              <ButtonsBottom icon={home}>Ajuda</ButtonsBottom>
            </Link><Link to={ROUTES.PROFILE}>
              <ButtonsBottom icon={home}>Sair</ButtonsBottom>
            </Link>
          </div>
        ) : (
            <Link to={ROUTES.PROFILE}>
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

export default Navbar;
