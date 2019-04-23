import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import './Profile.css';

class Profile extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
          <h1 className="Heading">Olá, Usuário</h1>
          <h1 className="Pessoal-Area-Infos">Esta é suas área pessoal.</h1>
          <div className="containerCenter">
            <article className="photoProfile"></article>
            <h1 className="Profile-Name">Nome do Usuário</h1>
            <h1 className="Pessoal-Area-Infos">usuario@gmail.com</h1>
            <h1 className="Profile-Descripiton">Aluna do SMD</h1>

            <article className="Context-Button">EDITAR INFORMAÇÕES</article>
            <article className="line"></article>
          </div>
          <h1 className="Heading">Minha lista</h1>
          <Carousel className="carousel"/>
          <h1 className="Heading">Meus trabalhos</h1>
          <Carousel className="carousel"/>
        </div>
      </div>
    );
  }
}

export default Profile;
