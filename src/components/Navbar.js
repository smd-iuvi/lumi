import React, { Component } from 'react';
import '../components/Navbar.css';
import logo from '../assets/lumi_logo.png';
import home from '../assets/icons/home_button.svg';
import explore from '../assets/icons/explore_button.svg';
import search from '../assets/icons/search_button.svg';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <img src={logo} alt="Logo" className="logo"/>
        <div className="iconsLeft">
          <img src={home} alt="Home" className="icon"/>
          <img src={explore} alt="Explore" className="icon"/>
        </div>
        <div className="iconsRight">
          <img src={search} alt="Search" className="icon search"/>
          <article className="profile"></article>
        </div>
      </div>
    );
  }
}

export default Navbar;
