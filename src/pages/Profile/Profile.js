import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import Carousel from '../../components/Carousel/Carousel';

import { withFirebase } from '../../Firebase';
import { withAuthorization, withAuthUser } from '../../Firebase/Session';

import ImgProfile from '../../components/Sidebar/assets/profile.jpg';

import * as CONDITIONS from '../../constants/authorizingConditions';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      watchList: null,
      myWorks: null,
      error: null,
      loadingWatchList: true,
      loadingMyWorks: true
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

  render() {
    const { authUser } = this.props;
    const { watchList, myWorks, loadingMyWorks, loadingWatchList } = this.state;
    return (
      <div className="container">
        <h1 className="Heading">Olá, {authUser ? authUser.name : ''}</h1>
        <h1 className="Pessoal-Area-Infos">Esta é suas área pessoal.</h1>
        <div className="containerCenter">
          <img src={ImgProfile} className="photoProfile" />
          <h1 className="Profile-Name">{authUser ? authUser.name : ''}</h1>
          <h1 className="Pessoal-Area-Infos">
            {authUser ? authUser.email : ''}
          </h1>
          <h1 className="Profile-Descripiton">Aluna do SMD</h1>

          <article className="Context-Button">EDITAR INFORMAÇÕES</article>
          <article className="line" />
        </div>
        <h1 className="Heading">Minha lista</h1>
        {loadingMyWorks ? (
          watchList ? (
            <Carousel className="carousel" videos={watchList} />
          ) : (
            <p>Não há videos na sua lista</p>
          )
        ) : (
          <p>Carregando...</p>
        )}
        <h1 className="Heading">Meus trabalhos</h1>
        {loadingWatchList ? (
          myWorks ? (
            <Carousel className="carousel" videos={myWorks} />
          ) : (
            <p>Você ainda não enviou algum vídeo</p>
          )
        ) : (
          <p>Carregando...</p>
        )}
      </div>
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
