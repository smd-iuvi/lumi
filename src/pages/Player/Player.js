import React, { Component } from 'react';

import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import SidebarPlayer from '../../components/SidebarPlayer/SidebarPlayer';
import CommentSection from '../../components/CommentSection/CommentSection';

import { withFirebase } from '../../Firebase';

import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      video: null
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const {
      firebase,
      match: { params }
    } = this.props;

    firebase.video.get(params.videoId, (video, error) => {
      console.log(video);
      this.setState({ video, error, loading: false });
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.video.turnOff();
  }

  render() {
    return (
      <div className="container containerPlayer">
        <div className="containerLeft">
          <VideoPlayer />
        </div>
        <div className="containerRight">
          <SidebarPlayer />
        </div>
        <div className="ContainerBottom">
          <CommentSection />
        </div>
      </div>
    );
  }
}

export default withFirebase(Player);
