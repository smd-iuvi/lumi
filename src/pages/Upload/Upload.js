import React, { useState, useEffect } from 'react';
import './Upload.css';

import { withServiceManager } from '../../services';

import Header from '../../components/Header/Header';
import SectionTitle from '../../components/SessionTitle/SessionTitle';
import TextAreaInformation from '../../components/Upload/TextAreaInformation/TextAreaInformation';
import TextFieldInformation from '../../components/Upload/TextFieldInformation/TextFieldInformation';
import Thumbnail from '../../components/Upload/Thumbnail/Thumbnail';
import AddTags from '../../components/Upload/AddTags/AddTags';
import SelectBox from '../../components/Upload/SelectBox/SelectBox';
import NewInformation from '../../components/Upload/NewInformation/NewInformation';

function Upload(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('Animação');
  const [tags, setTags] = useState([]);
  const [url, setUrl] = useState('');
  const [parentalRating, setParentalRating] = useState('Livre');
  const [discipline, setDiscipline] = useState('Nenhuma');
  const [semester, setSemester] = useState('2020.1');
  const [content, setContent] = useState('');
  const [professor, setProfessor] = useState('');
  const [about, setAbout] = useState('');
  const [userId, setUserId] = useState(1);

  function addInformation() {
    //adicionar novo NewInformation
  };

  function onSubmit() {
    const { serviceManager } = props;

    const video = {
      title,
      description,
      genre,
      tags,
      url,
      parentalRating,
      discipline,
      semester,
      content,
      professor,
      about,
      userId
    };

    serviceManager.video.create(video)
    .then(response => {})
    .catch(err => {
      if (err == null) {
        alert('Video enviado com sucesso');
      } else {
        alert('Houve algum erro ao enviar o vídeo');
      }
    });
  };

  function reset() {
    setTitle('');
    setDescription('');
    setGenre('Animação');
    setTags([]);
    setUrl('');
    setParentalRating('Livre');
    setDiscipline('Nenhuma');
    setSemester('2019.1');
    setContent('');
    setProfessor('');
    setAbout('');
    setUserId(1);
  };

  function isFormInvalid() {
    const isInvalid =
      title === '' ||
      description === '' ||
      genre === '' ||
      url === '' ||
      parentalRating === '' ||
      discipline === '' ||
      semester === '' ||
      content === '' ||
      professor === '' ||
      about === '';

    return isInvalid;
  };

  return (
    <div className="container uploadContainer">
      <div className="topContainer">
        <div>
          <Header>Enviar vídeo</Header>
          <TextAreaInformation
            name="description"
            onChange={e => setDescription(e.target.value)}
            value={description}
          >
            Sinopse/Descrição
          </TextAreaInformation>

          <SelectBox
            name="genre"
            label="Gênero"
            onChange={e => setGenre(e.target.value)}
            value={genre}
          />
        </div>
        <div>
          <button className="button buttonSecundary" onClick={reset}>
            DESFAZER ALTERAÇÕES
          </button>
          <button className="button buttonPrimary" onClick={onSubmit}>
            SALVAR
          </button>
          <TextFieldInformation
            name="url"
            label="Link para o vídeo"
            onChange={e => setUrl(e.target.value)}
            value={url}
          />
          <TextFieldInformation
            name="title"
            label="Título"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <Thumbnail />
        </div>
        <div>
          <AddTags />

          <SelectBox
            name="parentalRating"
            label="Classificação"
            onChange={e => setParentalRating(e.target.value)}
            value={parentalRating}
          />

          <TextFieldInformation
            name="content"
            label="Conteúdo"
            onChange={e => setContent(e.target.value)}
            value={content}
          />
        </div>
      </div>
      <div className="bottomContainer">
        <div className="leftContainer">
          <SectionTitle>Ficha Técnica</SectionTitle>
          <button className="Context-Button addInfo">
            ADICIONAR INFORMAÇÃO
          </button>
          <NewInformation />
        </div>
        <div>
          <SectionTitle>Informações Acadêmicas</SectionTitle>

          <SelectBox
            name="discipline"
            label="Disciplina"
            onChange={e => setDiscipline(e.target.value)}
            value={discipline}
          />

          <TextFieldInformation
            name="professor"
            label="Professor"
            onChange={e => setProfessor(e.target.value)}
            value={professor}
          />
          <SelectBox
            name="semester"
            label="Semestre"
            onChange={e => setSemester(e.target.value)}
            value={semester}
          />
          <TextAreaInformation
            name="about"
            onChange={e => setAbout(e.target.value)}
            value={about}
          >
            Sobre o trabalho
          </TextAreaInformation>
        </div>
      </div>
    </div>
  );
}

export default withServiceManager(Upload);
