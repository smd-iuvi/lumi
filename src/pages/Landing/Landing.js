import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import logo from './assets/lumi.svg';

const Landing = () => {
  return (
    <div className="landing">
      <div className="landingNavbar">
        <Link to={ROUTES.SIGN_UP} className="link">
          <h1 className="Large-Text-Bold buttonRegister">Cadastre-se</h1>
        </Link>
        <Link to={ROUTES.SIGN_IN} className="link">
          <h1 className="Large-Text-Bold">Entrar</h1>
        </Link>
      </div>

      <div className="landingContent">
        <img src={logo} className="landingLogo" />
        <h1 className="Large-Text-Regular">Frase topperson sobre o lumi</h1>
        <Link to={ROUTES.HOME} className="link">
          <button className="button buttonPrimary">Conheça agora</button>
        </Link>
      </div>

      <div className="landingNetworks">
        <article><i class="fab fa-facebook-f"></i></article>
        <article><i class="fab fa-instagram"></i></article>
        <article><i class="fas fa-globe"></i></article>
      </div>
    </div>
  );
};

export default Landing;
