import React from 'react'

import './Footer.css';

import ufc from './assets/ufc.png';
import lumi from './assets/lumi.svg';
import smd from './assets/smd.png';
import facebook from './assets/facebook.svg';
import instagram from './assets/instagram.svg';

const Footer = () => {
  return (
    <div className="Footer">
      <div className="optionsFooter">
        <div>
          <h1 className="titleOptions">Recursos</h1>
          <h1 className="options">Descobrir</h1>
          <h1 className="options">Sobre o Lumi</h1>
          <h1 className="options">Site do SMD</h1>
          <h1 className="options">Site da UFC</h1>
        </div>
        <div>
          <h1 className="titleOptions">Conta</h1>
          <h1 className="options">Minha conta</h1>
          <h1 className="options">Minha lista</h1>
          <h1 className="options">Vídeos enviados</h1>
        </div>
        <div>
          <h1 className="titleOptions">Suporte</h1>
          <h1 className="options">Preciso de ajuda</h1>
          <h1 className="options">Relatar um problema</h1>
        </div>
        <div>
          <div className="logos">
            <img src={ufc} className="logoImg" />
            <img src={smd} className="logoImg" />
            <img src={lumi} className="logoImg" />
          </div>
          <h1 className="titleOptions">Redes sociais</h1>
          <div className="networks logos">
            <article>
              <img src={facebook} />
              <h1 className="titleNetwork">@SMDUFC</h1>
            </article>
            <article>
              <img src={instagram} />
              <h1 className="titleNetwork">@smdufc</h1>
            </article>
          </div>
        </div>
      </div>
      <article className="line" />
      <div className="footerBottom">
        <h1 className="textFooter">© 2019</h1>
        <h1 className="textFooter">Lumi</h1>
        <h1 className="textFooter">Sistemas e Mídias Digitais UFC</h1>
      </div>
    </div>
  )
}

export default Footer
