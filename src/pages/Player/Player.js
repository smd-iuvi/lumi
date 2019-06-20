import React, { Component } from 'react';
import { compose } from 'recompose';

import TabBarPlayer from '../../components/Player/TabBarPlayer/TabBarPlayer';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import SidebarPlayer from '../../components/SidebarPlayer/SidebarPlayer';
import CommentSection from '../../components/CommentSection/CommentSection';
import Datasheet from '../../components/Player/Datasheet/Datasheet';

import { withFirebase } from '../../Firebase';
import { withAuthUser } from '../../Firebase/Session';

import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      video: null,
      nextVideo: null,
      onWatchList: false,
      duration: 0,
      watched: false,
      tabs: ['Ficha técnica', 'Informações acadêmicas', 'Tags'],
      selected: 0
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const {
      firebase,
      match: { params }
    } = this.props;

    this.listener = firebase.db
      .ref(`video/${params.videoId}`)
      .on('value', snapshot => {
        this.setState({ video: snapshot.val(), loading: false });
      });

    firebase.video
      .getNextVideo(params.videoId)
      .then(video => this.setState({ nextVideo: video }))
      .catch(error => this.setState({ error }));
  }

  onProgress = progress => {
    const { watched, duration } = this.state;
    const {
      firebase,
      match: { params }
    } = this.props;

    if (progress.playedSeconds > duration / 2 && !watched) {
      this.setState({ watched: true });
      firebase.video
        .view(params.videoId)
        .then(video => {})
        .catch(error => {
          console.log(error);
        });
    }
  };

  onDuration = d => {
    this.setState({ duration: d });
  };

  componentWillUnmount() {
    const {
      firebase,
      match: { params }
    } = this.props;
    firebase.db.ref(`video/${params.videoId}`).off();
  }

  didClap = () => {
    const {
      firebase,
      match: { params }
    } = this.props;

    firebase.video
      .clap(params.videoId)
      .then(() => {})
      .catch(error => {
        this.setState({ error });
      });
  };

  checkUserWatchList = () => {
    const {
      authUser,
      match: { params }
    } = this.props;

    if (authUser.watchList && authUser.watchList.includes(params.videoId)) {
      this.setState({ onWatchList: true });
    } else {
      this.setState({ onWatchList: false });
    }
  };

  didAddToWatchlist = () => {
    const {
      firebase,
      authUser,
      match: { params }
    } = this.props;

    firebase.user
      .addVideoToList(authUser.uid, params.videoId)
      .then(() => {
        this.checkUserWatchList();
      })
      .catch(error => {});
  };

  render() {
    const { video, nextVideo, loading, onWatchList } = this.state;
    const {
      authUser,
      match: { params }
    } = this.props;

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
              didClap={this.didClap}
              didAddToWatchlist={() => this.didAddToWatchlist()}
              name={nameLabel}
              url={url}
              views={viewsLabel}
              videoId={params.videoId}
              claps={clapsLabel}
              onWatchList={onWatchList}
              onDuration={progress => this.onDuration(progress)}
              onProgress={duration => this.onProgress(duration)}
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
}

export default compose(
  withFirebase,
  withAuthUser
)(Player);
