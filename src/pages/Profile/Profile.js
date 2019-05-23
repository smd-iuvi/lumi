import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import Carousel from '../../components/Carousel/Carousel';

import { withFirebase } from '../../Firebase';
import { withAuthorization, withAuthUser } from '../../Firebase/Session';

import ImgProfile from '../../components/Sidebar/assets/profile.jpg';
import iconProfile from './assets/user.svg';

import * as CONDITIONS from '../../constants/authorizingConditions';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import './Profile.css';
import ProfileImage from '../../components/ProfileCard/ProfileImage/ProfileImage';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ProfileLabels from '../../components/ProfileLabels/ProfileLabels';
import CardList from '../../components/CardList/CardList';
import CardFilm from '../../components/CardFilm/CardFilm';
import TabBar from '../../components/TabBar/TabBar';
import SecondaryButton from '../../components/Buttons/SecondaryButton/SecondaryButton';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      watchList: null,
      myWorks: null,
      error: null,
      loadingWatchList: true,
      loadingMyWorks: true,
      tabs: ['Minhas informações', 'Meus envios', 'Minha lista'],
      selected: 0
    };
  }

  componentDidMount() {
    const { firebase, authUser } = this.props;

    this.setState({ loadingMyWorks: true });

    firebase.video
      .getVideosByUser(authUser.uid)
      .then(videos => {
        this.setState({ myWorks: videos, loadingMyWorks: false });
      })
      .catch(error => {
        this.setState({ error, loadingWatchList: false });
      });

    if (authUser.watchList) {
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
    }
  }

  onTabChange = newTab => {
    this.setState({ selected: newTab });
  };

  render() {
    const { authUser } = this.props;
    const {
      watchList,
      myWorks,
      loadingMyWorks,
      loadingWatchList,
      selected
    } = this.state;

    let container = null;

    if (selected == 0) {
      container = (
        <>
          <ProfileCard
            name={authUser.name}
            imgUrl={authUser.photo_url}
            role={authUser.role}
            className="ProfileCard"
          />
          <article className="lineSidebar" />
          <ProfileLabels />
          <SecondaryButton>Salvar modificações</SecondaryButton>
        </>
      );
    } else if (selected == 1) {
      container = (
        <>
          <CardList>
            <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
            <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
            <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
            <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
          </CardList>
        </>
      );
    } else if (selected == 2) {
      container = (
        <>
          <CardList>
            <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
            <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
            <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
            <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
          </CardList>
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
