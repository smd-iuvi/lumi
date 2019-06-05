import React, { Component } from 'react';

import './Steps.css';

import { withFirebase } from '../../../Firebase';

import Thumbnail from '../Thumbnail/Thumbnail';
import TextFieldInformation from '../TextFieldInformation/TextFieldInformation';
import TextAreaInformation from '../TextAreaInformation/TextAreaInformation';
import SelectBox from '../SelectBox/SelectBox';
import AddTags from '../AddTags/AddTags';
// import { on } from 'cluster';

class Step1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genreDataSource: [],
      parentalRatingDataSource: [
        'Livre',
        '10 anos',
        '12 anos',
        '14 anos',
        '16 anos',
        '18 anos'
      ]
    };
  }

  componentDidMount() {
    const { firebase } = this.props;

    firebase.genre
      .get()
      .then(genreDataSource => {
        const genreNames = genreDataSource.map(genre => genre.name);
        this.setState({ genreDataSource: genreNames });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const { stepState, onChange, uploading, onFileChange, error } = this.props;
    const { genreDataSource, parentalRatingDataSource } = this.state;

    console.log(genreDataSource);

    return (
      <div className="Steps">
        <h1 className="Large-Text-Medium">Informações gerais</h1>
        <article className="line" />
        <Thumbnail
          uploading={uploading}
          url={stepState.imageUrl.value}
          isValid={stepState.imageUrl.isValid}
          onFileChange={onFileChange}
          error={error}
        />
        <TextFieldInformation
          name="title"
          value={stepState.title.value}
          isValid={stepState.title.isValid}
          onChange={onChange}
          placeholder="Título do vídeo"
        />
        <TextFieldInformation
          name="link"
          value={stepState.link.value}
          isValid={stepState.link.isValid}
          onChange={onChange}
          placeholder="Link do vídeo"
        />
        <TextAreaInformation
          name="description"
          value={stepState.description.value}
          isValid={stepState.description.isValid}
          onChange={onChange}
          placeholder="Sinopse/Descrição"
        />
        <SelectBox
          name="genre"
          dataSource={genreDataSource}
          value={stepState.genre.value}
          isValid={stepState.genre.isValid}
          onChange={onChange}
          placeholder="Gênero"
        />
        <div className="classificationDiv">
          <SelectBox
            name="parentalRating"
            dataSource={parentalRatingDataSource}
            value={stepState.parentalRating.value}
            isValid={stepState.parentalRating.isValid}
            onChange={onChange}
            placeholder="Classificação"
          />
          <TextFieldInformation
            name="content"
            value={stepState.content.value}
            isValid={stepState.content.isValid}
            onChange={onChange}
            placeholder="Conteúdo"
          />
        </div>
        <AddTags
          name="tags"
          value={stepState.tags.value}
          onChange={onChange}
          list={false}
          placeholder="Adicione tags ao seu vídeo"
        />
      </div>
    );
  }
}

export default withFirebase(Step1);
