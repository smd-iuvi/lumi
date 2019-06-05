import React, { Component } from 'react';

import './Steps.css';

import { withFirebase } from '../../../Firebase';

import TextFieldInformation from '../../Upload/TextFieldInformation/TextFieldInformation';
import SelectBox from '../../Upload/SelectBox/SelectBox';
import TextAreaInformation from '../../Upload/TextAreaInformation/TextAreaInformation';
import Thumbnail from '../../Upload/Thumbnail/Thumbnail';

class Step1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disciplineDataSource: [],
      semesterDataSource: []
    };
  }

  componentDidMount() {
    const { firebase } = this.props;

    firebase.discipline
      .get()
      .then(disciplines => {
        const disciplineDataSource = disciplines.map(
          discipline => discipline.name
        );
        this.setState({ disciplineDataSource });
      })
      .catch(error => {
        this.setState({ error });
      });

    firebase.semester
      .get()
      .then(semesters => {
        const semesterDataSource = semesters.map(semester => semester.name);
        this.setState({ semesterDataSource });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const { disciplineDataSource, semesterDataSource } = this.state;
    const { stepState, onChange, uploading, onFileChange, error } = this.props;
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
          name="name"
          value={stepState.name.value}
          isValid={stepState.name.isValid}
          onChange={onChange}
          placeholder="Nome do evento"
        />
        <div className="selectsDiv">
          <SelectBox
            name="discipline"
            value={stepState.discipline.value}
            isValid={stepState.discipline.isValid}
            onChange={onChange}
            dataSource={disciplineDataSource}
            placeholder="Disciplina que o evento faz parte"
          />
          <SelectBox
            name="semester"
            value={stepState.semester.value}
            isValid={stepState.semester.isValid}
            onChange={onChange}
            dataSource={semesterDataSource}
            placeholder="Semestre da disciplina"
          />
        </div>
        <TextAreaInformation
          name="description"
          value={stepState.description.value}
          isValid={stepState.description.isValid}
          onChange={onChange}
          placeholder="Escreva aqui um resumo sobre o conteúdo ou a proposta dos trabalhos que estarão presentes nesse evento."
        />
      </div>
    );
  }
}

export default withFirebase(Step1);
