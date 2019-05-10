import React, { Component } from 'react';
import './Upload.css';

import { withFirebase } from '../../Firebase';

import Header from '../../components/Header/Header';
import SectionTitle from '../../components/SessionTitle/SessionTitle';
import TextAreaInformation from '../../components/Upload/TextAreaInformation/TextAreaInformation';
import TextFieldInformation from '../../components/Upload/TextFieldInformation/TextFieldInformation';
import Thumbnail from '../../components/Upload/Thumbnail/Thumbnail';
import AddTags from '../../components/Upload/AddTags/AddTags';
import SelectBox from '../../components/Upload/SelectBox/SelectBox';
import NewInformation from '../../components/Upload/NewInformation/NewInformation';

const FORM_INITIAL_STATE = {
  title: '',
  description: '',
  genre: 'Animação',
  tags: [],
  url: '',
  parentalRating: 'Livre',
  discipline: 'Nenhuma',
  semester: '2019.1',
  content: '',
  professor: '',
  about: '',
  userId: 1
};

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = { ...FORM_INITIAL_STATE };
    this.addInformation = this.addInformation.bind(this);
  }

  addInformation = () => {
    //adicionar novo NewInformation
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  onSubmit = () => {
    const { firebase } = this.props;

    const video = {
      ...this.state
    };

    firebase.video.create(video, error => {
      if (error == null) {
        alert('Video enviado com sucesso');
      } else {
        alert('Houve algum erro ao enviar o vídeo');
      }
    });
  };

  reset = () => {
    this.setState({ form: FORM_INITIAL_STATE });
    console.log(this.state);
  };

  isFormInvalid = () => {
    const {
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
      about
    } = this.state;

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

  render() {
    const {
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
      about
    } = this.state;

    return (
      <div className="container uploadContainer">
        <div className="topContainer">
          <div>
            <Header>Enviar vídeo</Header>
            <TextAreaInformation
              name="description"
              onChange={this.onChange}
              value={description}
            >
              Sinopse/Descrição
            </TextAreaInformation>

            <SelectBox
              name="genre"
              label="Gênero"
              onChange={this.onChange}
              value={genre}
            />
          </div>
          <div>
            <button className="button buttonSecundary" onClick={this.reset}>
              DESFAZER ALTERAÇÕES
            </button>
            <button className="button buttonPrimary" onClick={this.onSubmit}>
              SALVAR
            </button>
            <TextFieldInformation
              name="url"
              label="Link para o vídeo"
              onChange={this.onChange}
              value={url}
            />
            <TextFieldInformation
              name="title"
              label="Título"
              onChange={this.onChange}
              value={title}
            />
            <Thumbnail />
          </div>
          <div>
            <AddTags />

            <SelectBox
              name="parentalRating"
              label="Classificação"
              onChange={this.onChange}
              value={parentalRating}
            />

            <TextFieldInformation
              name="content"
              label="Conteúdo"
              onChange={this.onChange}
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
              onChange={this.onChange}
              value={discipline}
            />

            <TextFieldInformation
              name="professor"
              label="Professor"
              onChange={this.onChange}
              value={professor}
            />
            <SelectBox
              name="semester"
              label="Semestre"
              onChange={this.onChange}
              value={semester}
            />
            <TextAreaInformation
              name="about"
              onChange={this.onChange}
              value={about}
            >
              Sobre o trabalho
            </TextAreaInformation>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Upload);
