import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import './Search.css';

import iconResultSearch from './assets/resultSearch.svg';
import iconSearch from './assets/search.png';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import { withFirebase } from '../../Firebase';

import TabBar from '../../components/TabBar/TabBar';
import CardList from '../../components/CardList/CardList';
import CardFilm from '../../components/CardFilm/CardFilm';
import EmptyLabel from '../../components/EmptyLabel/EmptyLabel';

const pushUpStyle = {
  marginTop: '-50px'
};

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: ['Tudo', 'Vídeos', 'Pessoas', 'Disciplinas'],
      usersListState: {
        list: null,
        loading: false,
        error: null
      },
      videosListState: {
        list: null,
        loading: false,
        error: null
      },
      disciplinesListState: {
        list: null,
        loading: false,
        error: null
      }
    };
  }

  componentDidMount() {
    const {
      firebase,
      match: { params }
    } = this.props;
    const {
      usersListState,
      disciplinesListState,
      videosListState
    } = this.state;

    const newVideosListState = { ...usersListState, loading: true };
    const newDisciplinesListState = { ...disciplinesListState, loading: true };
    const newUserListState = { ...videosListState, loading: true };

    this.setState({
      usersListState: newUserListState,
      videosListState: newVideosListState,
      disciplinesListState: newDisciplinesListState
    });

    firebase.user
      .getByName(params.searchTerm)
      .then(users => {
        const { usersListState } = this.state;
        const newUserListState = {
          ...usersListState,
          loading: false,
          list: users
        };
        this.setState({ usersListState: newUserListState });
      })
      .catch(error => {
        const { usersListState } = this.state;
        const newUserListState = {
          ...usersListState,
          loading: false,
          error: error
        };
        this.setState({ usersListState: newUserListState });
      });

    firebase.discipline
      .getByName(params.searchTerm)
      .then(disciplines => {
        const { disciplinesListState } = this.state;
        const newDisciplinesListState = {
          ...disciplinesListState,
          loading: false,
          list: disciplines
        };
        this.setState({ disciplinesListState: newDisciplinesListState });
      })
      .catch(error => {
        const { disciplinesListState } = this.state;
        const newDisciplinesListState = {
          ...disciplinesListState,
          loading: false,
          error: error
        };
        this.setState({ disciplinesListState: newDisciplinesListState });
      });

    firebase.video
      .getByTitle(params.searchTerm)
      .then(videos => {
        const { videosListState } = this.state;
        const newVideosListState = {
          ...videosListState,
          loading: false,
          list: videos
        };

        this.setState({ videosListState: newVideosListState });
      })
      .catch(error => {
        const { videosListState } = this.state;
        const newVideosListState = {
          ...videosListState,
          loading: false,
          error: error
        };
        this.setState({ videosListState: newVideosListState });
      });
  }

  onTabChange = newTab => {
    const { history } = this.props;

    console.log(newTab);

    switch (parseInt(newTab)) {
      case 0:
        history.push(ROUTES.SEARCH_ALL);
        break;
      case 1:
        history.push(ROUTES.SEARCH_VIDEOS);
        break;
      case 2:
        history.push(ROUTES.SEARCH_USERS);
        break;
      case 3:
        history.push(ROUTES.SEARCH_DISCIPLINES);
        break;
      default:
        break;
    }
  };

  getSelectedTab = () => {
    const { location } = this.props;
    if (location.pathname === ROUTES.SEARCH_ALL) {
      return 0;
    } else if (location.pathname === ROUTES.SEARCH_VIDEOS) {
      return 1;
    } else if (location.pathname === ROUTES.SEARCH_USERS) {
      return 2;
    } else if (location.pathname === ROUTES.SEARCH_DISCIPLINES) {
      return 3;
    }
  };

  render() {
    const {
      videosListState,
      usersListState,
      disciplinesListState
    } = this.state;

    let container = null;

    const selected = this.getSelectedTab();

    if (selected === 0) {
      container = (
        <>
          {videosListState.loading === false &&
          videosListState.list === null ? (
            <>
              <img src={iconSearch} />
              <EmptyLabel>Nenhum resultado encontrado :(</EmptyLabel>
            </>
          ) : (
            <CardList
              videos={videosListState.list}
              loading={videosListState.loading}
              belowTab={true}
            />
          )}
        </>
      );
    } else if (selected === 1) {
      container = (
        <>
          <img src={iconSearch} />
          <EmptyLabel>Nenhum resultado encontrado :(</EmptyLabel>
        </>
      );
    } else if (selected === 2) {
      container = (
        <>
          <img src={iconSearch} />
          <EmptyLabel>Nenhum resultado encontrado :(</EmptyLabel>
        </>
      );
    } else if (selected === 3) {
      container = (
        <>
          <img src={iconSearch} />
          <EmptyLabel>Nenhum resultado encontrado :(</EmptyLabel>
        </>
      );
    }
    return (
      <>
        <TabBar
          icon={iconResultSearch}
          title="Resultado da busca"
          selected={selected}
          tabs={this.state.tabs}
          onTabChange={this.onTabChange}
          profileTeacher={false}
        />
        <div className="container searchPage">{container}</div>
      </>
    );
  }
}

export default compose(
  withRouter,
  withFirebase
)(Search);
