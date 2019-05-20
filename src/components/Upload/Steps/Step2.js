import React from 'react';

import './Steps.css';

import Thumbnail from '../Thumbnail/Thumbnail';
import TextFieldInformation from '../TextFieldInformation/TextFieldInformation';
import TextAreaInformation from '../TextAreaInformation/TextAreaInformation';

const Step2 = (props) => {
    return (
        <div className="Steps">
            <h1 className="titleStep">Ficha técnica</h1>
            <article className="line"></article>
            <h1 className="subtitleStep">Aqui você pode mostrar quem participou da produção do seu vídeo.</h1>
        </div>
    );
};

export default Step2;
