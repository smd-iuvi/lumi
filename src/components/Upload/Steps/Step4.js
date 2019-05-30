import React, { Component } from 'react';

import './Steps.css';

import SelectBox from '../SelectBox/SelectBox';
import TextFieldInformation from '../TextFieldInformation/TextFieldInformation';
import TextAreaInformation from '../TextAreaInformation/TextAreaInformation';

class Step4 extends Component {
    state = {
        showSelect: false
    }
    handleSelect = () => {
        this.setState({ showSelect: !this.state.showSelect });
    }
    render() {
        return (
            <div className="Steps">
                <h1 className="Large-Text-Medium">Informações acadêmicas</h1>
                <article className="line"></article>
                <h1 className="subtitleStep Small-Text-Regular">Fale mais sobre seu trabalho acadêmico.</h1>
                <div className="selects">
                    <SelectBox name="discipline" placeholder="Disciplina" />
                    <SelectBox name="semester" placeholder="Semestre" />
                </div>
                <TextFieldInformation placeholder="Professor(es) da disciplina" />
                <TextAreaInformation placeholder="Sobre o trabalho" />
                <h1 className="Medium-Text-Medium">Evento de disciplina</h1>
                <div className="checkDiscipline">
                    <input type="checkbox" id="checkbox" className="checkboxEvent" onChange={this.handleSelect} />
                    <label for="checkbox" className="Medium-Text-Medium">Este vídeo faz parte de um evento da disciplina.</label>
                </div>
                {this.state.showSelect &&
                    <SelectBox name="events" placeholder="Selecione o evento" />
                }
            </div>
        )
    };
};

export default Step4;
