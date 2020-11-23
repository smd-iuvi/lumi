import React, { useState } from 'react';
import './NavBar.css';

import { Link, withRouter } from 'react-router-dom';
import logo from './assets/lumi.svg';
import search from './assets/search_button.svg';
import * as ROUTES from '../../constants/routes';

function NavBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  function onKeyDown(e) {
    if (e.key === 'Enter' && searchTerm !== '') {
      setSearchTerm('');
      props.history.push(`${ROUTES.SEARCH_ALL}/${searchTerm}`);
      e.target.blur();
    }
  };

  return (
    <div className={props.class}>
      <Link to={ROUTES.HOME} className="link">
        <img src={logo} alt="Logo" className="logo" />
      </Link>

      <img src={search} className="iconNavbar" />

      <input
        type="text"
        className="inputSearch Small-Text-Regular"
        placeholder="Busque por vídeos, disciplinas, gêneros…"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default withRouter(NavBar);
