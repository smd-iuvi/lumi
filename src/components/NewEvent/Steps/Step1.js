import React, { useState, useEffect } from 'react';

import './Steps.css';

import { withFirebase } from '../../../Firebase';

import TextFieldInformation from '../../Upload/TextFieldInformation/TextFieldInformation';
import SelectBox from '../../Upload/SelectBox/SelectBox';
import TextAreaInformation from '../../Upload/TextAreaInformation/TextAreaInformation';
import Thumbnail from '../../Upload/Thumbnail/Thumbnail';

function Step1(props) {
  const [disciplineDataSource, setDisciplineDataSource] = useState([]);
  const [semesterDataSource, setSemesterDataSource] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { firebase } = props;

    firebase.discipline
      .get()
      .then(disciplines => {
        const disciplineDataSource = disciplines.map(
          discipline => discipline.name
        );
        setDisciplineDataSource(disciplineDataSource);
      })
      .catch(error => {
        setError(error);
      });

    firebase.semester
      .get()
      .then(semesters => {
        const semesterDataSource = semesters.map(semester => semester.name);
        setSemesterDataSource(semesterDataSource);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  const { stepState, onChange, uploading, onFileChange } = props;
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

export default withFirebase(Step1);
