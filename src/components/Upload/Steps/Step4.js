import React from 'react';

import './Steps.css';

import Thumbnail from '../Thumbnail/Thumbnail';
import TextFieldInformation from '../TextFieldInformation/TextFieldInformation';
import TextAreaInformation from '../TextAreaInformation/TextAreaInformation';

const Step4 = (props) => {
    return (
        <div className="Steps">
            <h1 className="titleStep">Informações acadêmicas</h1>
            <article className="line"></article>
            <h1 className="subtitleStep">Fale mais sobre seu trabalho acadêmico.</h1>
        </div>
    );
};

export default Step4;
