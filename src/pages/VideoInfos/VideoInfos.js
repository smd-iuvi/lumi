import React, { Component } from 'react';

import './VideoInfos.css';

import * as ROUTES from '../../constants/routes';

import PlayButton from '../../components/Buttons/PlayButton/PlayButton';
import ActionsPlayer from '../../components/ActionsPlayer/ActionsPlayer';
import Tags from '../../components/Tags/Tags';
import ParentalRating from '../../components/ParentalRating/ParentalRating';
import SessionTitle from '../../components/SessionTitle/SessionTitle';
import Info from '../../components/VideoInfo/VideoInfo';

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
    const {
      match: { params }
    } = this.props;

    this.props.history.push(`${ROUTES.PLAYER}/${params.videoId}`);
  };

  render() {
    const { video, loading } = this.state;

    let titleLabel;
    let disciplineLabel;
    let semesterLabel;
    let durationLabel;
    let genreLabel;
    let descriptionLabel;

    if (loading) {
      titleLabel = 'Carregando...';
      disciplineLabel = 'Carregando...';
      semesterLabel = 'Carregando...';
      durationLabel = 'Carregando...';
      genreLabel = 'Carregando...';
    } else if (video != null) {
      titleLabel = video.title ? video.title : 'Informação não disponível';
      disciplineLabel = video.discipline
        ? video.discipline
        : 'Semestre desconhecido';
      semesterLabel = video.semester ? video.semester : 'Semestre desconhecido';
      durationLabel = video.duration ? video.duration : 'Duração desconhecida';
      genreLabel = video.genre ? video.genre : 'Gênero desconhecido';
      descriptionLabel = video.description
        ? video.description
        : 'Sem descrição';
    }

    return (
      <div className="container infos">
        <div className="VideoInfos">
          <div>
            <h1 className="Type">Filme</h1>
            <h1 className="Heading TitleFilm">{titleLabel}</h1>
            <div className="descriptionVideo">
              <h1 className="Descriptions Discipline">{disciplineLabel}</h1>
              <div className="Infos">
                <h1 className="Descriptions">{semesterLabel}</h1>
                <h1 className="Descriptions">{durationLabel}</h1>
                <h1 className="Descriptions">{genreLabel}</h1>
              </div>
            </div>
            <h1 className="Descriptions">{descriptionLabel}</h1>

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
        <article className="line" />
        <div className="gridInfos">
          <div>
            <SessionTitle>Ficha técnica</SessionTitle>
            <div className="datasheet">
              <Info label="Direção" />
              <Info label="Roteiro" />
              <Info label="Fotografia" />
              <Info label="Elenco" />
              <Info label="Edição" />
            </div>
          </div>
          <div>
            <SessionTitle>Informações Acadêmicas</SessionTitle>
            <div className="academicInfo">
              <Info label="Disciplina" />
              <Info label="Sobre o trabalho" />
              <Info label="Professor" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(VideoInfos);