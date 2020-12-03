import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import './Search.css';

import iconResultSearch from './assets/resultSearch.svg';
import iconSearch from './assets/search.png';

import { QueryableFields as Video } from '../../services/Models/Video';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import { withServiceManager } from '../../services';

import TabBar from '../../components/TabBar/TabBar';
import CardList from '../../components/CardList/CardList';
import CardFilm from '../../components/CardFilm/CardFilm';
import EmptyLabel from '../../components/EmptyLabel/EmptyLabel';

const pushUpStyle = {
  marginTop: '-50px'
};

function Search(props) {
  const [tabs, settabs] = useState(['Tudo', 'Vídeos', 'Pessoas', 'Disciplinas']);
  const [usersListState, setUsersListState] = useState({
    list: null,
    loading: false,
    error: null
  });
  const [videosListState, setVideosListState] = useState({
    list: null,
    loading: false,
    error: null
  });
  const [disciplinesListState, setDisciplinesListState] = useState({
    list: null,
    loading: false,
    error: null
  });

  useEffect(() => {
    const {
      serviceManager,
      match: { params }
    } = props;

    const newVideosListState = { ...usersListState, loading: true };
    const newDisciplinesListState = { ...disciplinesListState, loading: true };
    const newUserListState = { ...videosListState, loading: true };

    setUsersListState(newUserListState);
    setVideosListState(newVideosListState);
    setDisciplinesListState(newDisciplinesListState);

    serviceManager.user
      .getByName(params.searchTerm)
      .then(users => {
        const newUserListState = {
          ...usersListState,
          loading: false,
          list: users
        };
        setUsersListState(newUserListState);
      })
      .catch(error => {
        const newUserListState = {
          ...usersListState,
          loading: false,
          error: error
        };
        setUsersListState(newUserListState);
      });

    serviceManager.discipline
      .getByName(params.searchTerm)
      .then(disciplines => {
        const newDisciplinesListState = {
          ...disciplinesListState,
          loading: false,
          list: disciplines
        };
        setDisciplinesListState(newDisciplinesListState);
      })
      .catch(error => {
        const newDisciplinesListState = {
          ...disciplinesListState,
          loading: false,
          error: error
        };
        setDisciplinesListState(newDisciplinesListState);
      });

    serviceManager.video
      .getVideosBy(Video.TITLE, params.searchTerm)
      .then(videos => {
        const newVideosListState = {
          ...videosListState,
          loading: false,
          list: videos
        };
        setVideosListState(newVideosListState);
      })
      .catch(error => {
        const newVideosListState = {
          ...videosListState,
          loading: false,
          error: error
        };
        setVideosListState(newVideosListState);
      });
  }, []);

  function onTabChange(newTab) {
    const { history } = props;

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

  function getSelectedTab() {
    const { location } = props;
    if (location.pathname.includes(ROUTES.SEARCH_ALL)) {
      return 0;
    } else if (location.pathname === ROUTES.SEARCH_VIDEOS) {
      return 1;
    } else if (location.pathname === ROUTES.SEARCH_USERS) {
      return 2;
    } else if (location.pathname === ROUTES.SEARCH_DISCIPLINES) {
      return 3;
    }
  };

  const {
    match: { params }
  } = props;

  let container = null;

  const selected = getSelectedTab();

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
        title={`Resultado da busca "${params.searchTerm}"`}
        selected={selected}
        tabs={tabs}
        onTabChange={onTabChange}
        profileTeacher={false}
      />
      <div className="container searchPage">{container}</div>
    </>
  );
}

export default compose(
  withRouter,
  withServiceManager
)(Search);
