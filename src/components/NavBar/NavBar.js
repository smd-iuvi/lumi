import React, { Component } from 'react';
import './NavBar.css';

import { withRouter } from 'react-router-dom';

import search from './assets/search_button.svg';

class NavBar extends Component {

  goSearch = () => {
    this.props.history.push('/SEARCH')
  }
  render() {
    return (
      <div className="navbar">
        <img src={search} className="iconNavbar" />

        <input
          type="text"
          className="inputSearch"
          placeholder="Busque por vídeos, disciplinas, gêneros…"
          onClick={this.goSearch}
        />

      </div>
    )
  };
};

export default withRouter(NavBar);
