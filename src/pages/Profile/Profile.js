import React, { Component } from 'react';

import Carousel from '../../components/Carousel/Carousel';

import ImgProfile from '../../components/Sidebar/assets/profile.jpg';

import './Profile.css';

class Profile extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="Heading">Olá, Usuário</h1>
        <h1 className="Pessoal-Area-Infos">Esta é suas área pessoal.</h1>
        <div className="containerCenter">
          <img src={ImgProfile} className="photoProfile" />
          <h1 className="Profile-Name">Júlia Tôledo</h1>
          <h1 className="Pessoal-Area-Infos">juliatoledo@gmail.com</h1>
          <h1 className="Profile-Descripiton">Aluna do SMD</h1>

          <article className="Context-Button">EDITAR INFORMAÇÕES</article>
          <article className="line" />
        </div>
        <h1 className="Heading">Minha lista</h1>
        <Carousel className="carousel" />
        <h1 className="Heading">Meus trabalhos</h1>
        <Carousel className="carousel" />
      </div>
    );
  }
}

export default Profile;
