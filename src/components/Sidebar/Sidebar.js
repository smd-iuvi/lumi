import React, { Component } from 'react';

import './Sidebar.css';

import * as ROUTES from '../../constants/routes';
import ButtonsTop from './ButtonsTop/ButtonsTop';
import ButtonProfile from './ButtonProfile/ButtonProfile';
import ButtonsBottom from './ButtonsBottom/ButtonsBottom';
import Upload from '../Upload/Upload';

import logo from './assets/icons/lumi.svg';
import profile from './assets/profile.jpg';

import { Link } from 'react-router-dom';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logged: true,
      showModal: false
    }
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal = () => {
    this.setState({ showModal: true })
  }

  onChangeState = () => {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <div className="sidebar">
        <Upload show={this.state.showModal} onChangeState={this.onChangeState} />

        <Link to={ROUTES.HOME} className="link">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="iconsTop">
          <Link to={ROUTES.HOME} className="link">
            <ButtonsTop class="iconButtonsTop iconHome">Início</ButtonsTop>
          </Link>
          <Link to={ROUTES.HOME} className="link">
            <ButtonsTop class="iconButtonsTop iconExplore">Descobrir</ButtonsTop>
          </Link>
        </div>
        <article className="lineSidebar"></article>
        {this.state.logged ? (
          <div className="optionsLogged">
            <div className="optionsProfile">
              <Link to={ROUTES.PROFILE} className="link">
                <ButtonProfile image={profile}>Clarissa Ester</ButtonProfile>
              </Link>
              <article onClick={this.handleModal} className="showModal">
                <ButtonsBottom className="btnShow" class="iconBottom iconNewVideo">Enviar vídeo</ButtonsBottom>
              </article>
              <Link to={ROUTES.PROFILE} className="link">
                <ButtonsBottom class="iconBottom iconUser">Meu perfil</ButtonsBottom>
              </Link>
              <Link to={ROUTES.PROFILE} className="link">
                <ButtonsBottom class="iconBottom iconMyVideos">Meus envios</ButtonsBottom>
              </Link>
              <Link to={ROUTES.PROFILE} className="link">
                <ButtonsBottom class="iconBottom iconList">Minha lista</ButtonsBottom>
              </Link>
            </div>
            <Link to={ROUTES.PROFILE} className="link">
              <ButtonsBottom class="iconBottom iconHelp">Ajuda</ButtonsBottom>
            </Link><Link to={ROUTES.PROFILE} className="link">
              <ButtonsBottom class="iconBottom iconLogout">Sair</ButtonsBottom>
            </Link>
          </div>
        ) : (
            <Link to={ROUTES.PROFILE} className="link">
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
