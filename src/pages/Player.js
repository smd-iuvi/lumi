import React, { Component } from 'react';

import Navbar from '../components/NavBar/NavBar';
import NewComment from '../components/Comments/NewComment/NewComment';
import SidebarPlayer from '../components/SidebarPlayer/SidebarPlayer';
import ActionsPlayer from '../components/ActionsPlayer/ActionsPlayer';

import { withFirebase } from '../Firebase';

import './styles/Player.css';

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
    const { firebase } = this.props;

    firebase.video.get('-LeJafAkmRY9wYnhZKS4', (video, error) => {
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
      <div>
        <Navbar />
        <div className="container containerPlayer">
          <div className="containerLeft">
            <iframe
              src="https://www.youtube.com/embed/bo_efYhYU2A"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen="allowfullscreen"
              mozallowfullscreen="mozallowfullscreen"
              msallowfullscreen="msallowfullscreen"
              oallowfullscreen="oallowfullscreen"
              webkitallowfullscreen="webkitallowfullscreen"
            />
            <h1 className="Title-Film title">Bird Box</h1>
            <h1 className="Views-Film">5092 visualizações</h1>
            <ActionsPlayer className="actionsPlayer" />
          </div>
          <div className="containerRight">
            <SidebarPlayer />
          </div>
          <div className="ContainerBottom">
            <article className="line" />
            <NewComment />
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Player);
