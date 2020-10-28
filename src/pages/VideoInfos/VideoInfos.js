import React, { useState, useEffect } from 'react';

import './VideoInfos.css';

import * as ROUTES from '../../constants/routes';

import PlayButton from '../../components/Buttons/PlayButton/PlayButton';
import ActionsPlayer from '../../components/ActionsPlayer/ActionsPlayer';
import Tags from '../../components/Tags/Tags';
// import ParentalRating from '../../components/ParentalRating/ParentalRating';
import SessionTitle from '../../components/SessionTitle/SessionTitle';
import Info from '../../components/VideoInfo/VideoInfo';

import { withServiceManager } from '../../services';

function VideoInfos(props) {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const {
      serviceManager,
      match: { params }
    } = props;

    serviceManager.video
      .get(params.videoId)
      .then(video => {
        setVideo(video);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function onPlay(e) {
    const {
      match: { params }
    } = props;

    props.history.push(`${ROUTES.PLAYER}/${params.videoId}`);
  };

  let titleLabel;
  let disciplineLabel;
  let semesterLabel;
  let durationLabel;
  let genreLabel;
  let descriptionLabel;
  let parentalRating;
  let content;

  if (loading) {
    titleLabel = 'Carregando...';
    disciplineLabel = 'Carregando...';
    semesterLabel = 'Carregando...';
    durationLabel = 'Carregando...';
    genreLabel = 'Carregando...';
    content = 'Carregando...';
  } else if (video != null) {
    titleLabel = video.title ? video.title : 'Informação não disponível';
    disciplineLabel = video.discipline
      ? video.discipline
      : 'Disciplina desconhecida';
    semesterLabel = video.semester ? video.semester : 'Semestre desconhecido';
    parentalRating = video.parentalRating ? video.parentalRating : '';
    content = video.content ? video.content : 'Conteúdo desconhecido';
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

          <PlayButton disabled={loading ? true : false} click={onPlay}>
            Assistir
          </PlayButton>

          <ActionsPlayer />
        </div>
        <div>
          {/* <ParentalRating age={parentalRating} content={content} /> */}
          <Tags />
        </div>
      </div>
      <article className="line" />
      <div className="gridInfos">
        <div>
          <SessionTitle>Ficha técnica</SessionTitle>
          <div className="datasheet">
            <Info label="Direção" value={'Indisponível'} />
            <Info label="Roteiro" value={'Indisponível'} />
            <Info label="Fotografia" value={'Indisponível'} />
            <Info label="Elenco" value={'Indisponível'} />
            <Info label="Edição" value={'Indisponível'} />
          </div>
        </div>
        <div>
          <SessionTitle>Informações Acadêmicas</SessionTitle>
          <div className="academicInfo">
            <Info
              label="Disciplina"
              value={video ? video.discipline : 'Indisponível'}
            />
            <Info
              label="Sobre o trabalho"
              value={video ? video.about : 'Indisponível'}
            />
            <Info
              label="Professor"
              value={video ? video.professor : 'Indisponível'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withServiceManager(VideoInfos);
