import React, { Component } from 'react';
import './NavBar.css';

import { withRouter } from 'react-router-dom';

import search from './assets/search_button.svg';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: '' };
  }
  onKeyDown = e => {
    const { searchTerm } = this.state;

    if (e.key === 'Enter' && searchTerm !== '') {
      this.props.history.push(`/SEARCH/${searchTerm}`);
      e.target.blur();
    }
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <div className={this.props.class}>
        <img src={search} className="iconNavbar" />

        <input
          type="text"
          className="inputSearch"
          placeholder="Busque por vídeos, disciplinas, gêneros…"
          value={searchTerm}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
}

export default withRouter(NavBar);
