import React, { Component } from 'react';

import './NavBar.css';

import logo from './assets/lumi_logo.png';
import home from './assets/icons/home_button.svg';
import explore from './assets/icons/explore_button.svg';
import upload from './assets/icons/new_video.svg';
import profile from './assets/profile.jpg';
import { Link } from 'react-router-dom';

class Navbar extends Component {

  state = {
    logged: true
  }

  render() {
    return (
      <div className="navbar">
        <img src={logo} alt="Logo" className="logo"/>
        <div className="iconsLeft">
          <Link to="/"><img src={home} alt="Home" className="icon"/></Link>
          <h1 className="Buttons-Navbar">INÍCIO</h1>
          <img src={explore} alt="Explore" className="icon"/>
          <h1 className="Buttons-Navbar">DESCOBRIR</h1>
        </div>
        <div className="iconsRight">
          <input type="search" className="search textField" placeholder="Pesquisar"/>
          {this.state.logged ? (
            <div className="optionsLogged">
              <img src={upload} alt="Upload" className="icon"/>
              <img src={upload} alt="List" className="icon"/>
              <Link to="/Profile"><img src={profile} className="profile"></img></Link>
            </div>
          ) : (
            <Link to="/Profile"><button className="buttonLogin"><i className="far fa-user icon"/><h1 className="Buttons-Navbar">ENTRAR</h1></button></Link>
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
