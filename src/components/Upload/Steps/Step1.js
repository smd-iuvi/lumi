import React from 'react';

import './Steps.css';

import Thumbnail from '../Thumbnail/Thumbnail';
import TextFieldInformation from '../TextFieldInformation/TextFieldInformation';
import TextAreaInformation from '../TextAreaInformation/TextAreaInformation';

const Step1 = (props) => {
    return (
        <div className="Steps">
            <h1 className="titleStep">Informações gerais</h1>
            <article className="line"></article>
            <Thumbnail />
            <TextFieldInformation placeholder="Título do vídeo" />
            <TextFieldInformation placeholder="Link do vídeo" />
            <TextAreaInformation placeholder="Sinopse/Descrição" />
        </div>
    );
};

export default Step1;
