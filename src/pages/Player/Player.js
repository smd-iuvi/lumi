import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';

import TabBarPlayer from '../../components/Player/TabBarPlayer/TabBarPlayer';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import Modal from '../../components/Modal/Modal';
import CommentSection from '../../components/CommentSection/CommentSection';
import Datasheet from '../../components/Player/Datasheet/Datasheet';
import * as ROUTES from '../../constants/routes';
import ActionsPlayer from '../../components/ActionsPlayer/ActionsPlayer';

import { withServiceManager } from '../../services';
import { withAuthUser } from '../../services/Session';

import './Player.css';

function Player(props) {
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const [claps, setClap] = useState(null);
  const [views, setViews] = useState(null);
  const [nextVideo, setNextVideo] = useState(null);
  const [onWatchList, setOnWatchList] = useState(false);
  const [duration, setDuration] = useState(0);
  const [watched, setWatched] = useState(false);
  const [tabs, setTabs] = useState(['Ficha técnica', 'Informações acadêmicas', 'Tags']);
  const [selected, setSelected] = useState(false);
  const [error, setError] = useState(null);
  const [isVisibleModalLogin, setIsVisibleModalLogin] = useState(false);

  useEffect(() => {
    setLoading(true);
    const {
      serviceManager,
      match: { params }
    } = props;

    eventListener();

    serviceManager.video
      .getNextVideo(params.videoId)
      .then(video => setNextVideo(video))
      .catch(error => setError(error));

    if (authUser != null && authUser.watchList && authUser.watchList.includes(params.videoId))
      setOnWatchList(true);
    return () => {
      const {
        serviceManager,
        match: { params }
      } = props;
      serviceManager.db.ref(`video/${params.videoId}`).off();
    }
  }, []);

  function eventListener() {
    const {
      serviceManager,
      match: { params }
    } = props;

    serviceManager.video.get(params.videoId)
      .then(video => {
        console.log(video)
        setVideo(video);
        setLoading(false);
      })
  }


  function onProgress(progress) {
    const {
      serviceManager,
      match: { params }
    } = props;

    if (progress.playedSeconds > duration / 2 && !watched) {
      setWatched(true);
      serviceManager.video
        .view(params.videoId)
        .then(video => { })
        .catch(error => {
          console.log(error);
        });
    }
  };

  function onDuration(d) {
    setDuration(d);
  };

  function didClap() {
    const {
      serviceManager,
      authUser,
      match: { params }
    } = props;

    if (authUser) {
      serviceManager.video
        .clap(params.videoId)
        .then((clap) => {
          console.log(clap)
        })
        .catch(error => {
          setError(error);
        });
    } else {
      handleModal()
    }

  };

  function didAddToWatchlist() {
    const {
      serviceManager,
      authUser,
      match: { params }
    } = props;
    if (authUser) {
      serviceManager.user
        .addVideoToList(authUser.uid, params.videoId)
        .then(() => { })
        .catch(error => { });
    } else {
      handleModal();
    }
  };

  function getContentModal() {
    return <h1 className="Medium-Text-Regular">Faça já seu cadastro no Lumi e tenha acesso a todos os recursos!</h1>;
  }

  function getOptionsModal() {
    return <div>
      <button
        className="button buttonSecundary"
        onClick={() => props.history.push(ROUTES.SIGN_IN)}
      >
        Login
      </button>
      <button className="button buttonPrimary" onClick={() => props.history.push(ROUTES.SIGN_UP)}>
        Cadastre-se
      </button>
    </div>
  }

  function handleModal() {
    setIsVisibleModalLogin(!isVisibleModalLogin);
  }

  const {
    authUser,
    match: { params }
  } = props;

  let nameLabel;
  let url = '';
  let viewsLabel;
  let clapsLabel = 0;

  if (loading) {
    nameLabel = 'Carregando...';
    viewsLabel = 'Carregando';
  } else if (video != null) {
    nameLabel = video.title;
    viewsLabel = video.views;
    url = video.url;
    clapsLabel = video.claps;
  }

  return (
    <>
      {isVisibleModalLogin && <Modal
        title="É necessário fazer login"
        width={'30vw'}
        content={getContentModal()}
        options={getOptionsModal()}
        closeModal={handleModal}
      />}
      {window.innerWidth >= 800 && <TabBarPlayer video={video} nextVideo={nextVideo} viewsLabel={viewsLabel} />}
      <div className="containerPlayer">
        <div className="playerWithActions">
          {window.innerWidth < 800 && <TabBarPlayer video={video} nextVideo={nextVideo} viewsLabel={viewsLabel} />}
          <VideoPlayer
            name={nameLabel}
            url={url}
            videoId={params.videoId}
            onDuration={progress => onDuration(progress)}
            onProgress={duration => onProgress(duration)}
          />
          <div className="optionsFilm">
            <h1 className="Small-Text-Bold views">{viewsLabel} visualizações</h1>
            <ActionsPlayer
              didClap={didClap}
              didAddToWatchlist={() => didAddToWatchlist()}
              claps={clapsLabel}
              onWatchList={onWatchList}
            />
          </div>
          <CommentSection
            videoId={params.videoId}
            userId={authUser ? authUser.uid : null}
          />
          {window.innerWidth < 800 && <Datasheet video={video} />}
        </div>
        {window.innerWidth >= 800 && <Datasheet video={video} />}
      </div>
    </>
  );
}

export default compose(
  withServiceManager,
  withAuthUser
)(Player);
