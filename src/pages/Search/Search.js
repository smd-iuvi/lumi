import React, { Component } from 'react';

import iconResultSearch from './assets/resultSearch.svg';

import { withRouter } from 'react-router-dom';

import TabBar from '../../components/TabBar/TabBar';
import CardList from '../../components/CardList/CardList';
import CardFilm from '../../components/CardFilm/CardFilm';

const pushUpStyle = {
  marginTop: '-50px'
};

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: ['Tudo', 'Vídeos', 'Pessoas', 'Disciplinas'],
      selected: 0
    };
  }

  componentDidMount() {
    const {
      firebase,
      match: { params }
    } = this.props;

    firebase
      .doGeneralSearch(params.searchTerm)
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }

  onTabChange = newTab => {
    this.setState({ selected: newTab });
  };

  render() {
    const { selected } = this.state;

    let container = null;

    if (selected == 0) {
      container = (
        <>
          <CardList videos={null} loading={false} belowTab={true} />
        </>
      );
    } else if (selected == 1) {
      container = (
        <>
          <CardList videos={null} loading={false} belowTab={true} />
        </>
      );
    } else if (selected == 2) {
      container = (
        <>
          <CardList videos={null} loading={false} belowTab={true} />
        </>
      );
    } else if (selected == 3) {
      container = (
        <>
          <CardList videos={null} loading={false} belowTab={true} />
        </>
      );
    }
    return (
      <>
        <TabBar
          icon={iconResultSearch}
          title="Resultado da busca"
          tabs={this.state.tabs}
          onTabChange={this.onTabChange}
        />
        <div className="container">{container}</div>
      </>
    );
  }
}

export default Search;
