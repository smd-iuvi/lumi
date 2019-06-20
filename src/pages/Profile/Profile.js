import React, { Component } from 'react';
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
import { auth } from 'firebase';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      watchList: null,
      myWorks: null,
      myEvents: null,
      error: null,
      loadingWatchList: false,
      loadingMyWorks: false,
      loadingMyEvents: false,
      tabs: [],
      profileTeacher: true
    };
  }

  componentDidMount() {
    const { authUser, location } = this.props;

    //Verifica se é professor e muda as opções da tabbar
    if (authUser.role && authUser.role == ROLES.TEACHER) {
      this.setState({
        tabs: [
          'Minhas informações',
          'Meus envios',
          'Minha lista',
          'Meus eventos'
        ]
      });

      this.fetchEvents();
    } else {
      this.setState({
        tabs: ['Minhas informações', 'Meus envios', 'Minha lista']
      });
    }

    this.fetchMyWorks();

    if (authUser.watchList) {
      this.fetchMyWatchList();
    }
  }

  getSelectedTab = () => {
    const { location, authUser } = this.props;
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

  onTabChange = newTab => {
    const { history } = this.props;

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

  onEventDelete = uid => {
    const { firebase } = this.props;
    firebase.event.delete(uid).catch(error => this.setState({ error }));
    this.fetchEvents();
  };

  fetchEvents = () => {
    const { firebase, authUser } = this.props;
    this.setState({ loadingMyEvents: true });

    firebase.event
      .getEventsBy(Event.CREATED_BY, authUser.uid)
      .then(myEvents => this.setState({ myEvents, loadingMyEvents: false }))
      .catch(error => this.setState({ error }));
  };

  fetchMyWorks = () => {
    const { firebase, authUser } = this.props;
    this.setState({ loadingMyWorks: true });

    firebase.video
      .getVideosBy(Video.CREATED_BY, authUser.uid)
      .then(videos => {
        this.setState({ myWorks: videos, loadingMyWorks: false });
      })
      .catch(error => {
        this.setState({ error, loadingMyWorks: false });
      });
  };

  fetchMyWatchList = () => {
    const { firebase, authUser } = this.props;
    this.setState({ loadingWatchList: true });
    firebase.video
      .get()
      .then(videos => {
        const newWatchList = videos.filter(video => {
          return authUser.watchList.includes(video.uid);
        });

        this.setState({ watchList: newWatchList, loadingWatchList: false });
      })
      .catch(error => {
        this.setState({ error, loadingWatchList: false });
      });
  };

  render() {
    const { authUser } = this.props;
    const {
      watchList,
      myWorks,
      myEvents,
      loadingMyWorks,
      loadingWatchList,
      loadingMyEvents
    } = this.state;

    let container = null;

    const selected = this.getSelectedTab();

    if (selected === 0) {
      container = (
        <>
          <ProfileCard
            name={authUser.name}
            imgUrl={authUser.photo_url}
            role={authUser.role}
            className="ProfileCard"
            profileTeacher={this.state.profileTeacher}
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
                onDelete={this.onEventDelete}
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
          tabs={this.state.tabs}
          onTabChange={this.onTabChange}
          selected={selected}
          profileTeacher={this.state.profileTeacher}
        />
        <div className="container Profile">{container}</div>
      </>
    );
  }
}

const condition = authUser => {
  if (authUser == null) {
    console.log(CONDITIONS.NOT_LOGGED);
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
