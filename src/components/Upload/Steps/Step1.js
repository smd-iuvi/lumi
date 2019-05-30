import React from 'react';

import './Steps.css';

import Thumbnail from '../Thumbnail/Thumbnail';
import TextFieldInformation from '../TextFieldInformation/TextFieldInformation';
import TextAreaInformation from '../TextAreaInformation/TextAreaInformation';
import SelectBox from '../SelectBox/SelectBox';
import AddTags from '../AddTags/AddTags';

const Step1 = (props) => {
    return (
        <div className="Steps">
            <h1 className="Large-Text-Medium">Informações gerais</h1>
            <article className="line"></article>
            <Thumbnail />
            <TextFieldInformation placeholder="Título do vídeo" />
            <TextFieldInformation placeholder="Link do vídeo" />
            <TextAreaInformation placeholder="Sinopse/Descrição" />
            <SelectBox name="genre" placeholder="Gênero" />
            <div className="classificationDiv">
                <SelectBox name="parentalRating" placeholder="Classificação" />
                <TextFieldInformation placeholder="Conteúdo" />
            </div>
            <AddTags list={false} placeholder="Adicione tags ao seu vídeo" />
        </div>
    );
};

export default Step1;
