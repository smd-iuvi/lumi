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
          <h1 className="Medium-Text-Bold">Recursos</h1>
          <h1 className="Medium-Text-Regular">Descobrir</h1>
          <h1 className="Medium-Text-Regular">Sobre o Lumi</h1>
          <h1 className="Medium-Text-Regular">Site do SMD</h1>
          <h1 className="Medium-Text-Regular">Site da UFC</h1>
        </div>
        <div>
          <h1 className="Medium-Text-Bold">Conta</h1>
          <h1 className="Medium-Text-Regular">Minha conta</h1>
          <h1 className="Medium-Text-Regular">Minha lista</h1>
          <h1 className="Medium-Text-Regular">Vídeos enviados</h1>
        </div>
        <div>
          <h1 className="Medium-Text-Bold">Suporte</h1>
          <h1 className="Medium-Text-Regular">Preciso de ajuda</h1>
          <h1 className="Medium-Text-Regular">Relatar um problema</h1>
        </div>
        <div>
          <div className="logos">
            <img src={ufc} className="logoImg" />
            <img src={smd} className="logoImg" />
            <img src={lumi} className="logoImg" />
          </div>
          <h1 className="Medium-Text-Bold">Redes sociais</h1>
          <div className="networks logos">
            <article>
              <img src={facebook} />
              <h1 className="titleNetwork Medium-Text-Regular">@SMDUFC</h1>
            </article>
            <article>
              <img src={instagram} />
              <h1 className="titleNetwork Medium-Text-Regular">@smdufc</h1>
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
