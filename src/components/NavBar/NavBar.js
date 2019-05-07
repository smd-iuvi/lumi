import React, { Component } from 'react';

import './NavBar.css';

import logo from './assets/lumi_logo.png';
import home from './assets/icons/home_button.svg';
import explore from './assets/icons/explore_button.svg';
import upload from './assets/icons/new_video.svg';
import list from './assets/icons/list_button.svg';
import profile from './assets/profile.jpg';
import { Link } from 'react-router-dom';

class Navbar extends Component {

  state = {
    logged: true
  }

  render() {
    return (
      <div className="navbar">
        <Link to="/"><img src={logo} alt="Logo" className="logo"/></Link>
        <div className="iconsLeft">
          <Link to="/">
            <button className="buttonsNavbar home">
              <img src={home} alt="Home" className="icon"/>
              <h1 className="labelButtons">INÍCIO</h1>
            </button>
          </Link>
          <Link to="/">
            <button className="buttonsNavbar">
              <img src={explore} alt="Explore" className="icon"/>
              <h1 className="labelButtons">DESCOBRIR</h1>
            </button>
          </Link>
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
            <Link to="/Profile"><button className="buttonsNavbar"><i className="far fa-user icon"/><h1 className="labelButtons">ENTRAR</h1></button></Link>
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
