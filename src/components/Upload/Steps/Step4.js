import React, { Component } from 'react';

import './Steps.css';

import SelectBox from '../SelectBox/SelectBox';
import TextFieldInformation from '../TextFieldInformation/TextFieldInformation';
import TextAreaInformation from '../TextAreaInformation/TextAreaInformation';

class Step4 extends Component {
  state = {
    showSelect: false
  };
  handleSelect = () => {
    this.setState({ showSelect: !this.state.showSelect });
  };
  render() {
    const { stepState, onChange } = this.props;
    return (
      <div className="Steps">
        <h1 className="Large-Text-Medium">Informações acadêmicas</h1>
        <article className="line" />
        <h1 className="subtitleStep Small-Text-Regular">
          Fale mais sobre seu trabalho acadêmico.
        </h1>
        <div className="selects">
          <SelectBox
            name="discipline"
            value={stepState.discipline.value}
            onChange={onChange}
            placeholder="Disciplina"
          />
          <SelectBox
            name="semester"
            value={stepState.semester.value}
            onChange={onChange}
            placeholder="Semestre"
          />
        </div>
        <TextFieldInformation
          name="professor"
          value={stepState.professor.value}
          onChange={onChange}
          placeholder="Professor(es) da disciplina"
        />
        <TextAreaInformation
          name="about"
          value={stepState.about.value}
          onChange={onChange}
          placeholder="Sobre o trabalho"
        />
        <h1 className="Medium-Text-Medium">Evento de disciplina</h1>
        <div className="checkDiscipline">
          <input
            type="checkbox"
            id="checkbox"
            className="checkboxEvent"
            onChange={this.handleSelect}
          />
          <label for="checkbox" className="Medium-Text-Medium">
            Este vídeo faz parte de um evento da disciplina.
          </label>
        </div>
        {this.state.showSelect && (
          <SelectBox
            name="events"
            value={stepState.events.value}
            onChange={onChange}
            placeholder="Selecione o evento"
          />
        )}
      </div>
    );
  }
}

export default Step4;
