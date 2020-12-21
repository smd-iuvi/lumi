import React, { useState, useEffect } from 'react';

import './Steps.css';

import { withServiceManager } from '../../../services';

import Thumbnail from '../Thumbnail/Thumbnail';
import TextFieldInformation from '../TextFieldInformation/TextFieldInformation';
import TextAreaInformation from '../TextAreaInformation/TextAreaInformation';
import SelectBox from '../SelectBox/SelectBox';
import AddTags from '../AddTags/AddTags';
// import { on } from 'cluster';

function Step1(props) {
  const [error, setError] = useState('');
  const [genreDataSource, setGenreDataSource] = useState([]);
  const [parentalRatingDataSource, setParentalRatingDataSource] = useState([
    'Livre',
    '10 anos',
    '12 anos',
    '14 anos',
    '16 anos',
    '18 anos'
  ]);

  useEffect(() => {
    const { serviceManager } = props;

    serviceManager.genre
      .get()
      .then(genreDataSource => {
        console.log(genreDataSource)
        const genreNames = genreDataSource.map(genre => genre.name);
        setGenreDataSource(genreDataSource);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  const { stepState, onChange, uploading, onFileChange } = props;

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

export default withServiceManager(Step1);
