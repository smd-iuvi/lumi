import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import { withAuthorization, withAuthUser } from '../../Firebase/Session';

import iconProfile from './assets/user.svg';

import * as CONDITIONS from '../../constants/authorizingConditions';

import './Profile.css';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ProfileLabels from '../../components/ProfileLabels/ProfileLabels';
import CardList from '../../components/CardList/CardList';
import TabBar from '../../components/TabBar/TabBar';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      watchList: null,
      myWorks: null,
      error: null,
      loadingWatchList: false,
      loadingMyWorks: false,
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
        this.setState({ error, loadingMyWorks: false });
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

    console.log(selected);

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
        </>
      );
    } else if (selected == 1) {
      container = (
        <CardList loading={loadingMyWorks} videos={myWorks} belowTab={true} />
      );
    } else if (selected == 2) {
      container = (
        <CardList
          loading={loadingWatchList}
          videos={watchList}
          belowTab={true}
        />
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
