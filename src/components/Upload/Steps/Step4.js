import React from 'react';

import './Steps.css';

import SelectBox from '../SelectBox/SelectBox';
import TextFieldInformation from '../TextFieldInformation/TextFieldInformation';
import TextAreaInformation from '../TextAreaInformation/TextAreaInformation';

const Step4 = (props) => {
    return (
        <div className="Steps">
            <h1 className="titleStep">Informações acadêmicas</h1>
            <article className="line"></article>
            <h1 className="subtitleStep">Fale mais sobre seu trabalho acadêmico.</h1>
            <div className="selects">
                <SelectBox name="discipline" placeholder="Disciplina" />
                <SelectBox name="semester" placeholder="Semestre" />
            </div>
            <TextFieldInformation placeholder="Professor(es) da disciplina" />
            <TextAreaInformation placeholder="Sobre o trabalho" />
            <h1 className="titleStep2">Evento de disciplina</h1>
            <div className="checkDiscipline">
                <input type="checkbox" id="checkbox" />
                <label for="checkbox" className="titleStep2">Este vídeo faz parte de um evento da disciplina.</label>
            </div>
            <SelectBox name="events" placeholder="Selecione o evento" />
        </div>
    );
};

export default Step4;
