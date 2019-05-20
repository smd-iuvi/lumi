import React from 'react';

import './Steps.css';

import Thumbnail from '../Thumbnail/Thumbnail';
import TextFieldInformation from '../TextFieldInformation/TextFieldInformation';
import TextAreaInformation from '../TextAreaInformation/TextAreaInformation';

const Step3 = (props) => {
    return (
        <div className="Steps">
            <h1 className="titleStep">Tipo do vídeo</h1>
            <article className="line"></article>
            <h1 className="subtitleStep">Escolha uma das opções.</h1>
        </div>
    );
};

export default Step3;
