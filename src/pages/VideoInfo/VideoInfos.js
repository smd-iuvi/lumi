import React, { Component } from 'react';

import './VideoInfos.css';

import * as ROUTES from '../../constants/routes';

import PlayButton from '../../components/Buttons/PlayButton/PlayButton';
import ActionsPlayer from '../../components/ActionsPlayer/ActionsPlayer';
import Tags from '../../components/Tags/Tags';
import ParentalRating from '../../components/ParentalRating/ParentalRating';

import { withFirebase } from '../../Firebase';

class VideoInfos extends Component {
  constructor(props) {
    super(props);

    this.state = { video: null, loading: false };
  }
  componentDidMount() {
    this.setState({ loading: true });
    const {
      firebase,
      match: { params }
    } = this.props;

    firebase.video.get(params.videoId, (video, error) => {
      this.setState({ video, error, loading: false });
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.video.turnOff();
  }

  onPlay = e => {
    const { video } = this.state;
    const {
      match: { params }
    } = this.props;

    this.props.history.push(`${ROUTES.PLAYER}/${params.videoId}`);
  };

  render() {
    const { video, loading } = this.state;

    return (
      <div className="container VideoInfos">
        <div>
          <h1 className="Type">Filme</h1>
          <h1 className="Heading TitleFilm">Bird Box</h1>
          <div className="descriptionVideo">
            <h1 className="Descriptions Discipline">Narrativas Multimídea</h1>
            <div className="Infos">
              <h1 className="Descriptions">2018</h1>
              <h1 className="Descriptions">2h4min</h1>
              <h1 className="Descriptions">Thriller</h1>
            </div>
          </div>
          <h1 className="Descriptions">
            Quando uma força misteriosa dizima a população, apenas uma coisa é
            certa: se você olhar, você morre.
          </h1>

          <PlayButton disabled={loading ? true : false} click={this.onPlay}>
            Assistir
          </PlayButton>

          <ActionsPlayer />
        </div>
        <div>
          <ParentalRating />
          <Tags />
        </div>
      </div>
    );
  }
}

export default withFirebase(VideoInfos);
