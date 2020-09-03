import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';

import TabBarPlayer from '../../components/Player/TabBarPlayer/TabBarPlayer';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import SidebarPlayer from '../../components/SidebarPlayer/SidebarPlayer';
import CommentSection from '../../components/CommentSection/CommentSection';
import Datasheet from '../../components/Player/Datasheet/Datasheet';

import { withFirebase } from '../../Firebase';
import { withAuthUser } from '../../Firebase/Session';

import './Player.css';

function Player(props) {
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const [nextVideo, setNextVideo] = useState(null);
  const [onWatchList, setOnWatchList] = useState(false);
  const [duration, setDuration] = useState(0);
  const [watched, setWatched] = useState(false);
  const [tabs, setTabs] = useState(['Ficha técnica', 'Informações acadêmicas', 'Tags']);
  const [selected, setSelected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const {
      firebase,
      match: { params }
    } = props;

    eventListener();

    firebase.video
      .getNextVideo(params.videoId)
      .then(video => setNextVideo(video))
      .catch(error => setError(error));
  }, []);

  function eventListener() {
    props.firebase.db
      .ref(`video/${params.videoId}`)
      .on('value', snapshot => {
        setVideo(snapshot.val());
        setLoading(false);
      });
  }


  function onProgress(progress) {
    const {
      firebase,
      match: { params }
    } = props;

    if (progress.playedSeconds > duration / 2 && !watched) {
      setWatched(true);
      firebase.video
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

  useEffect(() => {
    return () => {
      const {
        firebase,
        match: { params }
      } = props;
      firebase.db.ref(`video/${params.videoId}`).off();
    }
  }, []);

  function didClap() {
    const {
      firebase,
      match: { params }
    } = props;

    firebase.video
      .clap(params.videoId)
      .then(() => { })
      .catch(error => {
        setError(error);
      });
  };

  function checkUserWatchList() {
    const {
      authUser,
      match: { params }
    } = props;

    if (authUser.watchList && authUser.watchList.includes(params.videoId)) {
      setOnWatchList(true);
    } else {
      setOnWatchList(false);
    }
  };

  function didAddToWatchlist() {
    const {
      firebase,
      authUser,
      match: { params }
    } = props;

    firebase.user
      .addVideoToList(authUser.uid, params.videoId)
      .then(() => {
        checkUserWatchList();
      })
      .catch(error => { });
  };

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
    url = video.link;
    clapsLabel = video.claps;
  }

  return (
    <>
      <TabBarPlayer video={video} nextVideo={nextVideo} />
      <div className="containerPlayer">
        <div>
          <VideoPlayer
            didClap={didClap}
            didAddToWatchlist={() => didAddToWatchlist()}
            name={nameLabel}
            url={url}
            views={viewsLabel}
            videoId={params.videoId}
            claps={clapsLabel}
            onWatchList={onWatchList}
            onDuration={progress => onDuration(progress)}
            onProgress={duration => onProgress(duration)}
          />
          <CommentSection
            videoId={params.videoId}
            userId={authUser ? authUser.uid : null}
          />
        </div>
        <Datasheet video={video} />
        {/* <Tabs tabs={this.state.tabs} onTabChange={this.onTabChange} /> */}
        {/* <div className="containerRight">
          <SidebarPlayer />
        </div>
        <div className="ContainerBottom">
          {authUser && (
            <CommentSection videoId={params.videoId} userId={authUser.uid} />
          )}
        </div> */}
      </div>
    </>
  );
}

export default compose(
  withFirebase,
  withAuthUser
)(Player);
