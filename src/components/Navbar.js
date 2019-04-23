import React, { Component } from 'react';
import '../components/Navbar.css';
import logo from '../assets/lumi_logo.png';
import home from '../assets/icons/home_button.svg';
import explore from '../assets/icons/explore_button.svg';
import search from '../assets/icons/search_button.svg';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <img src={logo} alt="Logo" className="logo"/>
        <div className="iconsLeft">
          <Link to="/"><img src={home} alt="Home" className="icon"/></Link>
          <img src={explore} alt="Explore" className="icon"/>
        </div>
        <div className="iconsRight">
          <img src={search} alt="Search" className="icon search"/>
          <Link to="/Profile"><article className="profile"></article></Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
