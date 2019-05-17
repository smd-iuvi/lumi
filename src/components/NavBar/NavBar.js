import React from 'react';
import './NavBar.css';

import search from './assets/search_button.svg';

const NavBar = () => {
    return (
        <div className="navbar">
            <img src={search} className="iconNavbar" />
            <input type="text" className="inputSearch" placeholder="Busque por vídeos, disciplinas, gêneros…" />
        </div>
    );
}

export default NavBar;
