import React from 'react';

import './Steps.css';

import Thumbnail from '../Thumbnail/Thumbnail';
import TextFieldInformation from '../TextFieldInformation/TextFieldInformation';
import TextAreaInformation from '../TextAreaInformation/TextAreaInformation';
import SelectBox from '../SelectBox/SelectBox';
import AddTags from '../AddTags/AddTags';
// import { on } from 'cluster';

const Step1 = ({ stepState, onChange, uploading, onFileChange }) => {
  return (
    <div className="Steps">
      <h1 className="Large-Text-Medium">Informações gerais</h1>
      <article className="line" />
      <Thumbnail
        uploading={uploading}
        url={stepState.imageUrl.value}
        onFileChange={onFileChange}
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
        value={stepState.genre.value}
        isValid={stepState.genre.isValid}
        onChange={onChange}
        placeholder="Gênero"
      />
      <div className="classificationDiv">
        <SelectBox
          name="parentalRating"
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
};

export default Step1;
