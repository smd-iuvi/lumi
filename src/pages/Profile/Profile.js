import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import { QueryableFields as Video } from '../../Firebase/Models/Video';
import { QueryableFields as Event } from '../../Firebase/Models/Event';
import { withAuthorization, withAuthUser } from '../../Firebase/Session';

import iconProfile from './assets/user.svg';
import iconMyVideos from './assets/myVideos.png';
import iconMyList from './assets/myList.png';

import * as CONDITIONS from '../../constants/authorizingConditions';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import './Profile.css';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ProfileLabels from '../../components/ProfileLabels/ProfileLabels';
import CardList from '../../components/CardList/CardList';
import TabBar from '../../components/TabBar/TabBar';
import EventsControll from '../../components/EventsControll/EventsControll';
import EmptyLabel from '../../components/EmptyLabel/EmptyLabel';

function Profile(props) {
  const [watchList, setWatchList] = useState(null);
  const [myWorks, setMyWorks] = useState(null);
  const [myEvents, setMyEvents] = useState(null);
  const [error, setError] = useState(null);
  const [loadingWatchList, setLoadingWatchList] = useState(false);
  const [loadingMyWorks, setLoadingMyWorks] = useState(false);
  const [loadingMyEvents, setLoadingMyEvents] = useState(false);
  const [tabs, setTabs] = useState([ROLES.USER]);
  const [profileTeacher, setProfileTeacher] = useState(false);

  useEffect(() => {
    const { authUser, location } = props;

    //Verifica se é professor e muda as opções da tabbar
    if (authUser.role && authUser.role === ROLES.TEACHER) {
      setTabs([
        'Minhas informações',
        'Meus envios',
        'Minha lista',
        'Meus eventos'
      ]);
      setProfileTeacher(true);

      fetchEvents();
    } else {
      setTabs(['Minhas informações', 'Meus envios', 'Minha lista']);
      setProfileTeacher(false);
    }

    fetchMyWorks();

    if (authUser.watchList) {
      fetchMyWatchList();
    }
  }, []);

  function getSelectedTab() {
    const { location, authUser } = props;
    if (location.pathname === ROUTES.PROFILE) {
      return 0;
    } else if (location.pathname === ROUTES.PROFILE_MY_UPLOADS) {
      return 1;
    } else if (location.pathname === ROUTES.PROFILE_MY_LIST) {
      return 2;
    } else if (
      location.pathname === ROUTES.PROFILE_MY_EVENTS &&
      authUser.role === ROLES.TEACHER
    ) {
      return 3;
    }
  };

  function onTabChange(newTab) {
    const { history } = props;

    switch (parseInt(newTab)) {
      case 0:
        history.push(ROUTES.PROFILE);
        break;
      case 1:
        history.push(ROUTES.PROFILE_MY_UPLOADS);
        break;
      case 2:
        history.push(ROUTES.PROFILE_MY_LIST);
        break;
      case 3:
        history.push(ROUTES.PROFILE_MY_EVENTS);
        break;
      default:
        break;
    }
  };

  function onEventDelete(uid) {
    const { firebase } = props;
    firebase.event.delete(uid).catch(error => setError(error));
    fetchEvents();
  };

  function fetchEvents() {
    const { firebase, authUser } = props;
    setLoadingMyEvents(true);

    firebase.event
      .getEventsBy(Event.CREATED_BY, authUser.uid)
      .then(myEvents => {
        setMyEvents(myEvents);
        setLoadingMyEvents(false)
      })
      .catch(error => setError(error));
  };

  function fetchMyWorks() {
    const { firebase, authUser } = props;
    setLoadingMyWorks(true);

    firebase.video
      .getVideosBy(Video.CREATED_BY, authUser.uid)
      .then(videos => {
        setMyWorks(videos);
        setLoadingMyWorks(false)
      })
      .catch(error => {
        setError(error);
        setLoadingMyWorks(false);
      });
  };

  function fetchMyWatchList() {
    const { firebase, authUser } = props;
    setLoadingWatchList(true);
    firebase.video
      .get()
      .then(videos => {
        const newWatchList = videos.filter(video => {
          return authUser.watchList.includes(video.uid);
        });
        setWatchList(newWatchList);
        setLoadingWatchList(false);
      })
      .catch(error => {
        setError(error);
        setLoadingWatchList(false);
      });
  };

  const { authUser } = props;

  let container = null;

  const selected = getSelectedTab();

  if (selected === 0) {
    container = (
      <>
        <ProfileCard
          name={authUser.name}
          imgUrl={authUser.photo_url}
          role={authUser.role}
          className="ProfileCard"
          profileTeacher={profileTeacher}
        />
        <article className="lineSidebar" />
        <ProfileLabels />
      </>
    );
  } else if (selected === 1) {
    container = (
      <>
        {loadingMyWorks === false && myWorks === null ? (
          <>
            <img src={iconMyVideos} />
            <EmptyLabel>Você ainda não enviou vídeos</EmptyLabel>
          </>
        ) : (
            <CardList
              loading={loadingMyWorks}
              videos={myWorks}
              belowTab={true}
              type="myVideos"
            />
          )}
      </>
    );
  } else if (selected === 2) {
    container = (
      <>
        {loadingWatchList === false && watchList === null ? (
          <>
            <img src={iconMyList} />
            <EmptyLabel>
              Você ainda não adicionou vídeos à sua lista
            </EmptyLabel>
          </>
        ) : (
            <CardList
              loading={loadingWatchList}
              videos={watchList}
              belowTab={true}
              type="myList"
            />
          )}
      </>
    );
  } else if (selected === 3) {
    container = (
      <>
        {loadingMyEvents === false && myEvents === null ? (
          <>
            <img src={iconMyList} />
            <EmptyLabel>Você ainda não criou nenhum evento</EmptyLabel>
          </>
        ) : (
            <EventsControll
              events={myEvents}
              loading={loadingMyEvents}
              onDelete={onEventDelete}
            />
          )}
      </>
    );
  }

  return (
    <>
      <TabBar
        icon={iconProfile}
        title="Meu perfil"
        tabs={tabs}
        onTabChange={onTabChange}
        selected={selected}
        profileTeacher={profileTeacher}
      />
      <div className="container Profile">{container}</div>
    </>
  );
}

const condition = authUser => {
  if (authUser == null) {
    return CONDITIONS.NOT_LOGGED;
  } else {
    return CONDITIONS.AUTHORIZED;
  }
};

export default compose(
  withAuthorization(condition),
  withAuthUser,
  withFirebase,
  withRouter
)(Profile);
